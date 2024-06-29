import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon({
    include: {
      mdi: ["*"], // (Default) Loads entire Material Design Icon set
      mdi: ["account"], // Loads only Material Design Icon's "account" SVG
    },
  })],
});