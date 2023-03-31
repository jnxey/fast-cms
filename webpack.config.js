import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const __dirname = path.resolve()

export default {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: {
    index: './index.ts'
  },
  devtool: false,
  output: {
    filename: '[name].' + process.env.EXEC_ENV + '.js',
    path: path.resolve(__dirname, 'build')
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
  plugins: [new CleanWebpackPlugin()]
}
