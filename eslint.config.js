import js from "@eslint/js";
import sveltePlugin from "eslint-plugin-svelte";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.svelte"],
    plugins: {
      svelte: sveltePlugin,
    },
    rules: {
      ...sveltePlugin.configs.recommended.rules,
    },
    languageOptions: {
      parser: sveltePlugin.parser,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
    languageOptions: {
      parser: tsPlugin.parser,
    },
  },
];
