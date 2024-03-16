import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import mdx from '@astrojs/mdx';
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [
    mdx(),
    preact(),
    tailwind()
  ],
  // output: "server"
});
