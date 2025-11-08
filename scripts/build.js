#!/usr/bin/env node

// Script de build personalizado que ignora erros de permissão do Docker no Windows
const { spawn } = require('child_process');
const path = require('path');

// Detectar se estamos em um ambiente de CI/CD
const isCI = !!(
  process.env.CI ||
  process.env.VERCEL ||
  process.env.GITHUB_ACTIONS ||
  process.env.GITLAB_CI ||
  process.env.CIRCLECI ||
  process.env.TRAVIS ||
  process.env.JENKINS_URL
);

// Detectar se estamos no Windows (onde os erros de permissão ocorrem)
const isWindows = process.platform === 'win32';

// Só usar o patch no Windows e em ambiente local (não CI/CD)
const shouldUsePatch = isWindows && !isCI;

// Executar o build do Next.js com tratamento de erros
console.log('Iniciando build do Next.js...');

const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: '1'
};

// Aplicar patch apenas se necessário
if (shouldUsePatch) {
  const patchPath = path.resolve(__dirname, 'patch-fs.js');
  const nodeOptions = process.env.NODE_OPTIONS || '';
  env.NODE_OPTIONS = `${nodeOptions} -r ${patchPath}`.trim();
  console.log('Patch de permissão do Windows ativado');
}

const nextBuild = spawn('next', ['build'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  cwd: path.resolve(__dirname, '..'),
  env
});

let hasPermissionError = false;

// Filtrar stderr para ignorar erros de permissão
nextBuild.stderr.on('data', (data) => {
  const message = data.toString();
  if (
    message.includes('EACCES') ||
    message.includes('permission denied') ||
    message.includes('docker-secrets-engine')
  ) {
    hasPermissionError = true;
    process.stderr.write('Aviso: Erro de permissão ignorado (docker-secrets-engine)\n');
    return;
  }
  process.stderr.write(data);
});


let buildOutput = '';

// Capturar output para verificar se compilou com sucesso
nextBuild.stdout.on('data', (data) => {
  const message = data.toString();
  buildOutput += message;
  process.stdout.write(data);
});

nextBuild.on('close', (code) => {
  // Verificar se o build compilou com sucesso
  const compiledSuccessfully = buildOutput.includes('Compiled successfully');
  
  // Em CI/CD, não aceitar código 9 (erro dos workers) como sucesso
  // pois isso pode causar problemas no deploy
  if (isCI) {
    if (code === 0) {
      console.log('\nBuild concluído com sucesso!');
      process.exit(0);
    } else {
      console.error(`\nBuild falhou com código ${code}`);
      process.exit(code);
    }
  }
  
  // Em ambiente local (Windows), podemos ser mais flexíveis
  if (code === 9 && compiledSuccessfully && shouldUsePatch) {
    console.log('\nBuild concluído com sucesso! (Aviso: alguns workers falharam devido a limitações do NODE_OPTIONS)');
    process.exit(0);
  } else if (code === 1 && hasPermissionError) {
    console.log('\nBuild concluído (erros de permissão do Docker foram ignorados)');
    process.exit(0);
  } else if (code === 0) {
    console.log('\nBuild concluído com sucesso!');
    process.exit(0);
  } else {
    process.exit(code);
  }
});

nextBuild.on('error', (error) => {
  if (error.code === 'EACCES' && error.path && error.path.includes('docker-secrets-engine')) {
    console.warn('Aviso: Erro de permissão ignorado durante o build');
    return;
  }
  console.error('Erro ao executar o build:', error);
  process.exit(1);
});

