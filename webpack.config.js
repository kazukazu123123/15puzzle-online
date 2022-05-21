const path = require('path')
const { resolve } = path
const PORT = 3000

module.exports = {
  cache: true,
  entry: './src/index.tsx',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.css', '.scss'] },

  output: {
    path: resolve(__dirname, 'public/build'),
    filename: './bundle.js',
  },

  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    port: PORT,
    host: '0.0.0.0',
    allowedHosts: 'all',
    open: `http://localhost:${PORT}`,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: {
                mode: 'local',
                localIdentName: '[local]__[hash:base64:8]',
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
}
