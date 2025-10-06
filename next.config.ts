import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  webpack: (config, { isServer }) => {
    // Configuração para resolver problemas de permissão no Windows
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/Ambiente de Impressão/**',
        '**/Ambiente de Rede/**',
        '**/AppData/**',
        '**/System Volume Information/**',
        '**/Windows/**',
        '**/Program Files/**',
        '**/Program Files (x86)/**',
        '**/Users/*/Ambiente de Impressão/**',
        '**/Users/*/Ambiente de Rede/**',
        '**/Users/*/AppData/**',
        '**/Users/*/Documents/**',
        '**/Users/*/Downloads/**',
        '**/Users/*/Pictures/**',
        '**/Users/*/Videos/**',
        '**/Users/*/Music/**',
        '**/Users/*/Desktop/**'
      ]
    };

    // Configuração para evitar erros de permissão
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [
        /^(.+?[\\/]node_modules[\\/])(@.+?[\\/])?.+?[\\/]/
      ]
    };

    // Configuração específica para resolver problemas de permissão no Windows
    if (process.platform === 'win32') {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
          os: false
        }
      };

      // Configuração adicional para Windows
      config.module = {
        ...config.module,
        rules: [
          ...(config.module?.rules || []),
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: [
              /node_modules/,
              /Ambiente de Impressão/,
              /Ambiente de Rede/,
              /AppData/,
              /System Volume Information/,
              /Windows/,
              /Program Files/,
              /Program Files \(x86\)/
            ]
          }
        ]
      };
    }

    // Configuração adicional para evitar erros de permissão
    config.infrastructureLogging = {
      level: 'error'
    };
    
    return config;
  }
};

export default nextConfig;