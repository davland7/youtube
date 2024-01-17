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
      devOptions: {
        enabled: true,
      },
      mode: 'development',
      base: '/',
      scope: '/',
      registerType: "autoUpdate",
      manifest: {
        "description": "Ma chaine YouTube",
        "display": "standalone",
        "icons": [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "id": "/?source=pwa",
        "lang": "fr",
        "name": "code • finance",
        "orientation": "portrait",
        "scope": "/",
        "short_name": "@davland7",
        "start_url": "/?source=pwa",
        "theme_color": "#ffffff"
      },
    }),
    mdx(),
    preact(),
    tailwind()
  ],
  output: "server",
  adapter: netlify()
});
