import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
 integrations: [
    AstroPWA({
      devOptions: { enabled: true },
      manifest: {
        name: "YouTube/@davland7",
        short_name: "@davland7",
        description: "Ma chaine YouTube",
        theme_color: "#ffffff ",
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
    tailwind()
  ],
  output: "server",
  adapter: netlify()
});
