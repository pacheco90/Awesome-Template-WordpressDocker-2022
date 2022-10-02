const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyPlugin = require('copy-webpack-plugin');
//const ImageminPlugin = require('imagemin-webpack-plugin').default;
const glob = require('glob');

var config = {
  entry: {
    'app': './src/js/main.js',
  },
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, '../src-wordpress/themes/custom_theme/dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }, 
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        use: {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              context: path.resolve(__dirname, "src/images/"),
              outputPath: 'dist/images',
              publicPath: '/wp-content/themes/custom_theme/dist/images/',
              useRelativePaths: true,
              esModule: false
            }
        }
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
    new CopyPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    // new CopyPlugin([
    //   {
    //     from: 'src/fonts',
    //     to: 'fonts'
    //   }
    // ]),
    new CopyPlugin([
      {
        from: 'src/images',
        to: 'images'
      }
    ]),
    new CopyPlugin([
      {
        from: 'src/videos',
        to: 'videos'
      }
    ]),
    new CopyPlugin([{
      from: "./*.php",
      to: '../'
    }]),
    new CopyPlugin([{
      from: "./*/*",
      to: '../',
      globOptions: {
        ignore: [
          "./node_modules",
          "./src"
        ],
      }
    }]),
    new CopyPlugin([{
      from: "./*.css",
      to: '../'
    }]),

    // new ImageminPlugin({
    //   externalImages: {
    //     context: './src/images',
    //     sources: glob.sync('src/images/**/*.{png,jpg,jpeg,gif,svg}'),
    //     destination:  path.resolve(__dirname, '../src-wordpress/themes/custom_theme/dist/images'),
    //     fileName: '[path][name].[ext]'
    //   }
    // })
    
  ]
};

module.exports = (env, argv) => {
  if (argv.mode !== 'production') {
    config.devtool = 'source-map';
  }

  return config;
};
