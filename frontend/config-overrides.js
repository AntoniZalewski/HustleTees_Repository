const { override, addWebpackModuleRule } = require('customize-cra');

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
  })
);
