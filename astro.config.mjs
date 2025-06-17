import { defineConfig } from "astro/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://daaveuk.github.io",
  vite: {
    plugins: [
      vanillaExtractPlugin({
        identifiers: "short",
        minify: true,
      }),
    ],
  },
  integrations: [react(), sitemap()],
  output: "static",
  build: {
    assets: "assets",
  },
});
