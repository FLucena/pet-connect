import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      dedupe: ['react', 'react-dom']
    },
    build: {
      chunkSizeWarningLimit: 1000,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              if (id.includes('bootstrap')) {
                return 'vendor-bootstrap';
              }
              return 'vendor';
            }
            if (id.includes('/components/')) {
              return 'components';
            }
            if (id.includes('/contexts/')) {
              return 'contexts';
            }
            if (id.includes('/services/')) {
              return 'services';
            }
            if (id.includes('/hooks/')) {
              return 'hooks';
            }
            if (id.includes('/utils/')) {
              return 'utils';
            }
            if (id.includes('/styles/') || id.includes('.css')) {
              return 'styles';
            }
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name?.split('.').pop() || '';
            return ext === 'css' 
              ? 'assets/css/[name]-[hash][extname]'
              : 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    server: {
      port: 5173,
      proxy: {
        '/.netlify/functions': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    define: {
      'import.meta.env.MODE': JSON.stringify(mode),
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.DISABLE_SW': JSON.stringify(mode === 'production')
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'bootstrap'
      ],
      dedupe: ['react', 'react-dom']
    },
    base: '/'
  }
})
