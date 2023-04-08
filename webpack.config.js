import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { FixHexoidError } from './webpack.plugin.js'

const __dirname = path.resolve()

const __buildpath = path.resolve(__dirname, 'build')

export default {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: {
    index: './index.ts'
  },
  devtool: false,
  output: {
    filename: '[name].js',
    path: __buildpath
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    },
    extensions: ['*', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript']
            }
          },
          { loader: 'ts-loader' }
        ],
        exclude: /(node_modules)/
      }
    ]
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'),
          to: path.resolve(__buildpath, 'assets')
        },
        {
          from: path.resolve(__dirname, 'views'),
          to: path.resolve(__buildpath, 'views')
        },
        {
          from: path.resolve(__dirname, 'assets/project.json'),
          to: path.resolve(__buildpath, 'package[ext]')
        }
      ]
    }),
    new FixHexoidError({ file: path.resolve(__buildpath, 'vendors.js') })
  ]
}
