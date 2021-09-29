
module.exports = {
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "mocha": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    },
    'import/resolver': {
      alias: {
        map: [
          ["@", './src'],
          ["@T", './theme'],
          ["@U", './utils']
        ]
      }
    },
    "import/ignore": [
      "node_modules",
      "config"
    ]
  },
    parserOptions: {
      "ecmaVersion": 9,
      "ecmaFeatures": {
        "impliedStrict": true,
        "jsx": true
      },
      "allowImportExportEverywhere": true,
      "sourceType": "module"
    },
  rules: {
      "semi": "off",
      "no-unused-vars": "off",
      "no-cond-assign": "error",
      "no-debugger": "warn",
      "no-dupe-args": "error",
      "no-caller": "error",
      "no-unmodified-loop-condition": "error",
      "no-with": "error",
      "no-catch-shadow": "error",
      "react/no-unescaped-entities": "off",
      "react-hooks/rules-of-hooks": "error",
      "react/prop-types": 0,
      "@typescript-eslint/explicit-function-return-type": 0, //{ "allowTypedFunctionExpressions": false }
      "prettier/prettier": [
        "warn",
        {
          "useTabs": false,
          "proseWrap": "preserve",
          "endOfLine": "auto"
        }
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
