import path from 'path';
import webpack from 'webpack';

export default () => ({
  entry: {
    app: './app/index.jsx',
    // app: ['./app/index.jsx'],
    // vendor: ['./app/vendors'],
  },
  devtool: 'inline-source-map',
  externals: {
    gon: 'gon',
  },
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'application.js',
    // filename: 'application.[chunkhash].main.js',
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env',
              '@babel/flow',
              '@babel/react',
              '@babel/stage-0',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env',
              '@babel/flow',
              '@babel/react',
              '@babel/stage-0',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
