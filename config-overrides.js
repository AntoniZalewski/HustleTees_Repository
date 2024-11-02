const { override, addWebpackModuleRule, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackModuleRule({
    test: /\.css$/,
    exclude: /bootstrap\.min\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  }),
  addWebpackModuleRule({
    test: /bootstrap\.min\.css$/,
    enforce: 'pre',
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'source-map-loader',
        options: {
          filterSourceMappingUrl: (url, resourcePath) => {
            return !resourcePath.includes('bootstrap.min.css');
          },
        },
      },
    ],
  }),
  addWebpackModuleRule({
    test: /\.mjs$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: [
      /node_modules\/@mediapipe\/tasks-vision/,
      /node_modules\/@react-three\/drei\/node_modules\/@mediapipe\/tasks-vision/
    ],
  }),
  (config) => {
    config.ignoreWarnings = [
      {
        module: /@react-three\/drei\/node_modules\/@mediapipe\/tasks-vision/,
        message: /Failed to parse source map/,
      },
    ];
    return config;
  }
);