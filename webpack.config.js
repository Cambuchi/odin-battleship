const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Battleship',
      favicon: './src/assets/images/favicon.ico',
      template: './src/index.html',
      ogimage: 'link to ogimage',
      meta: {
        description: {
          name: 'description',
          content: 'Battleship made for The ODIN Project',
        },
        keyword: {
          name: 'keywords',
          content: 'Javascript, Webpack',
        },
        'og:title': {
          property: 'og:title',
          content: 'Battleship',
        },
        'og:description': {
          property: 'og:description',
          content: 'Battleship made for The ODIN Project',
        },
        'og:type': { property: 'og:type', content: 'blog' },
        'og:url': {
          property: 'og:url',
          content: 'project url',
        },
        'twitter:title': {
          name: 'twitter:title',
          content: 'Battleship',
        },
        'twitter:description': {
          name: 'twitter:description',
          content: 'Battleship made for The ODIN Project',
        },
      },
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        //for importing css
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        //for importing images
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        //for importing fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        // for babel integration
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
