import { defineConfig } from "astro/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import istanbul from "vite-plugin-istanbul";

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
      // Add Istanbul instrumentation in development mode for Cypress coverage
      ...(process.env.NODE_ENV !== "production"
        ? [
            istanbul({
              include: "src/**/*.{js,ts,tsx}",
              exclude: ["node_modules", "test/", "**/*.test.*", "**/*.spec.*"],
              extension: [".js", ".ts", ".tsx"],
              requireEnv: false,
              cypress: true,
            }),
          ]
        : []),
    ],
  },
  integrations: [react(), sitemap()],
  output: "static",
  build: {
    assets: "assets",
  },
});
