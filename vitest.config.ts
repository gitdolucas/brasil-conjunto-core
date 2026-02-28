import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    extensions: [".ts"],
  },
  esbuild: {
    target: "ES2022",
  },
});
