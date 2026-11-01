import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootRedirectPlugin = (): Plugin => ({
  name: 'root-redirect',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/' || req.url === '') {
        res.writeHead(302, { Location: '/lms_gov.school/' });
        res.end();
      } else {
        next();
      }
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  base: '/lms_gov.school/',
  plugins: [react(), tailwindcss(), rootRedirectPlugin()],
})
