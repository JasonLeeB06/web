import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import solidJs from '@astrojs/solid-js';
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon(), solidJs()],
});