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
      injectRegister: "auto",
      manifest: {
        name: "code • finance",
        short_name: "@davland7",
        description: "Ma chaine YouTube",
        background_color: "#eab308",
        theme_color: "#eab308",
        orientation: "portrait",
        id: "/?source=pwa",
        start_url: "/?source=pwa",
        scope: "/",
        icons: [
          {
            src: "images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      registerType: "autoUpdate",
    }),
    mdx(),
    preact(),
    tailwind()
  ],
  output: "server",
  adapter: netlify()
});
