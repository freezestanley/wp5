module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        // Options
        execute: true,
        "postcss-short": { prefix: "x" }
      },
    ],
  ],
};