import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import AstroPWA from "@vite-pwa/astro";
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "fr",
    locales: ["en", "fr"],
  },
  integrations: [
    AstroPWA({
      devOptions: { enabled: true },
      manifest: {
        name: "code • finance",
        short_name: "CodeFinance",
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
            src: "images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      registerType: "autoUpdate"
    }),
    preact(),
    tailwind(),
    mdx()
  ],
  output: "server",
  adapter: netlify()
});
