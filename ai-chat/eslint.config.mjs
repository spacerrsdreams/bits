import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...pluginQuery.configs["flat/recommended"],
  {
    rules: {
      complexity: ["error", { max: 10 }],
      "no-var": "error",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "max-lines-per-function": [
        "error",
        {
          max: 300,
          skipBlankLines: false,
          skipComments: true,
        },
      ],
    },
  },
  {
    files: ["src/components/ui/**/*"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-var": "off",
      "max-lines-per-function": "off",
      complexity: "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];

export default eslintConfig;
