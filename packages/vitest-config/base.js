/**
 * Vitest base configuration for all packages.
 */

// External Dependencies -----------------------------------------------------

import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

// Internal Dependencies -----------------------------------------------------

export const baseConfig = defineConfig({
  plugins: [tsConfigPaths({ loose: true })],
  test: {
    coverage: {
      provider: "v8",
      reporter: [
        ["html", {dir: `../coverage`}],
//        ["json", {file: `../coverage.json`}],
      ],
      enabled: true,
    },
    fileParallelism: false,
    globals: true,
    sequence: {
      hooks: "list",
    },
    server: {
      deps: {
        inline: [ "next-auth" ],
      },
    }
  },
});
