import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { splitVendorChunkPlugin } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      splitVendorChunkPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              if (id.includes('bootstrap')) {
                return 'vendor-bootstrap';
              }
              return 'vendor';
            }
            
            // Application chunks
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
          chunkFileNames: () => `assets/[name]-[hash].js`,
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.names?.[0]?.split('.').pop() || '';
            return ext === 'css' 
              ? 'assets/css/[name]-[hash][extname]'
              : 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '/.netlify/functions'),
        },
      },
    },
    define: {
      'import.meta.env.MODE': JSON.stringify(mode)
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'bootstrap'
      ]
    }
  }
})
