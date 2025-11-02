/**
 * Vitest configuration for UI tests.
 */

// External Dependencies -----------------------------------------------------

import { defineProject, mergeConfig } from "vitest/config";

// Internal Dependencies -----------------------------------------------------

import { baseConfig } from "./base.js";

// Public Objects ------------------------------------------------------------

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    test: {
      environment: "jsdom",
    },
  })
);
