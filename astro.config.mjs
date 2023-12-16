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
        name: "@davland7",
        short_name: "@davland7",
        description: "YouTube/@davland7",
        background_color: "#ffffff",
        theme_color: "#000000",
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
    tailwind()
  ],
  output: "server",
  adapter: netlify()
});
