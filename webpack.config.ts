import path from "path";
import 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript'

type Mode = "production" | "development"

interface BuildPaths {
    entry: string
    html:string
    out:string
}

interface BuildOptions {
    port: number
    paths:BuildPaths
    mode: Mode
}

interface Env {
    mode: Mode
    port: number
}

export default (env: Env) => {
    const isDev = env.mode === 'development'

    const config: webpack.Configuration = {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            !isDev && new MiniCssExtractPlugin({filename: 'css/[name].[contenthash:8].css', chunkFilename: 'css/[name].[contenthash]:8.css'}),
            isDev && new ForkTsCheckerWebpackPlugin(),
            isDev && new ReactRefreshPlugin()
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
                                    localIdentName: '[local]-[hash:base64:8]'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: [{loader: '@svgr/webpack', options: {icon:true}}],
                },
                {
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
                },
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        devServer: isDev ? {
            static: './dist',
            port: env.port ?? 3000,
            historyApiFallback: true, // for routing
            hot:true, // HMR,
        } : undefined,
        devtool: isDev && 'inline-source-map'
    }

    return config
};