module.exports = {
  "presets": [
      ["@babel/preset-env",{
        useBuiltIns: 'usage', // 按需加载
        corejs: {
          version: 3
        },
        targets: {
          // 兼容到什么版本到浏览器
          chrome: '60',
          firefox: '50',
          ie: '9',
          safari: '10',
          edge: '17'
        }
      }],
      "@babel/preset-react",
      "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ]
}
