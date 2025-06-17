/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: "short",
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{js,ts,tsx}"],
    exclude: ["node_modules", "dist", ".astro"],
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/"],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@functions": "/src/functions",
      "@layouts": "/src/layouts",
    },
  },
});
