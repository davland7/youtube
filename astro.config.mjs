import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import preact from "@astrojs/preact";
import mdx from '@astrojs/mdx';
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    AstroPWA({
      devOptions: { enabled: true },
      manifest: {
        "background_color": "#eab308",
        "description": "Ma chaine YouTube",
        "display": "standalone",
        "icons": [
          {
            "src": "icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any",
          },
          {
            "src": "icons/android-chrome-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any",
          },
          {
            "src": "icons/android-chrome-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
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
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
        directoryIndex: 'index.html',
      },
    }),
    mdx(),
    preact(),
    tailwind()
  ],
  output: "server",
  adapter: netlify()
});
