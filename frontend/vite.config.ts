import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
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
  // Capacitor loads bundled assets from the APK, which requires relative URLs.
  // Keep the GitHub Pages base for regular web builds.
  base: process.env.CAPACITOR_BUILD ? './' : '/lms_gov.school/',
  plugins: [react(), tailwindcss(), rootRedirectPlugin()],
})
