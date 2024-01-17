import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import preact from "@astrojs/preact";
import mdx from '@astrojs/mdx';
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [
    AstroPWA({
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      mode: 'development',
      base: '/',
      scope: '/',
      registerType: "autoUpdate",
      includeAssets: ['icons/favicon.svg'],
      manifest: {
        "background_color": "#eab308",
        "description": "Ma chaine YouTube",
        "display": "standalone",
        "icons": [
          {
            "src": "icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
          },
          {
            "src": "icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
          },
          {
            "src": "icons/android-chrome-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
        "id": "code-finance-app",
        "lang": "fr",
        "name": "code • finance",
        "orientation": "portrait",
        "scope": "/",
        "short_name": "@davland7",
        "start_url": "/?source=pwa",
        "theme_color": "#eab308"
      },
    }),
    mdx(),
    preact(),
    tailwind()
  ],
  output: "server",
  adapter: netlify()
});
