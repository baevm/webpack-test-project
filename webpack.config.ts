import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import webpack from 'webpack'
import 'webpack-dev-server'

type Mode = 'production' | 'development'

interface Env {
  mode: Mode
  port: number
}

export default (env: Env) => {
  const isDev = env.mode === 'development'

  const tsloader = () => ({
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),
        transpileOnly: isDev,
      },
    },
    exclude: /node-modules/,
  })

  const babelLoader = () => ({
    test: /\.(js|ts)x?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: isDev ? 'automatic' : 'classic' }],
        ],
      },
    },
  })

  const swcLoader = () => ({
    test: /\.(js|ts)x?$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'swc-loader',
      options: {
        module: {
          type: 'es6',
        },
        minify: !isDev,
        isModule: true,
        jsc: {
          minify: {
            compress: true,
            mangle: true,
            format: {
              asciiOnly: true,
            },
          },
          target: 'es2016',
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    },
  })

  const esbuildLoader = () => ({
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    loader: 'esbuild-loader',
    options: {
      target: 'es2015',
      loader: 'tsx',
    },
  })

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash]:8.css',
        }),
      isDev && new ForkTsCheckerWebpackPlugin(),
      isDev && new ReactRefreshPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]-[hash:base64:8]',
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        },
        esbuildLoader(),
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devServer: isDev
      ? {
          static: './dist',
          port: env.port ?? 3000,
          historyApiFallback: true, // for routing
          hot: true, // HMR,
        }
      : undefined,
    devtool: isDev && 'inline-source-map',
  }

  return config
}
