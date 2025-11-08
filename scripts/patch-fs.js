// Patch para interceptar erros de permissão no Windows
const fs = require('fs');
const path = require('path');

// Diretórios do sistema que devem ser ignorados
const systemDirs = [
  'docker-secrets-engine',
  'AppData',
  'WinSAT',
  'System Volume Information',
  'Windows',
  'Program Files',
  'Program Files (x86)',
  'Ambiente de Impressão',
  'Ambiente de Rede'
];

function shouldIgnoreError(error, filePath) {
  if (!error || !filePath) return false;
  
  // Ignorar erros de permissão (EACCES, EPERM)
  if (error.code !== 'EACCES' && error.code !== 'EPERM') {
    return false;
  }
  
  // Verificar se o caminho contém algum diretório do sistema
  const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();
  return systemDirs.some(dir => normalizedPath.includes(dir.toLowerCase()));
}

// Patch para readdirSync
const originalReaddirSync = fs.readdirSync;
fs.readdirSync = function(filePath, options) {
  try {
    return originalReaddirSync.apply(this, arguments);
  } catch (error) {
    if (shouldIgnoreError(error, error.path || filePath)) {
      // Retornar array vazio em vez de lançar erro
      return [];
    }
    throw error;
  }
};

// Patch para readdir
const originalReaddir = fs.readdir;
fs.readdir = function(filePath, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  
  const wrappedCallback = function(err, files) {
    if (shouldIgnoreError(err, err?.path || filePath)) {
      // Retornar array vazio em vez de lançar erro
      return callback(null, []);
    }
    return callback(err, files);
  };
  
  return originalReaddir.apply(this, [filePath, options, wrappedCallback]);
};

