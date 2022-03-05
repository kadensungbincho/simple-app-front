const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJson = require('../package.json');

const APPLICATION_VERSION = packageJson.version;
const APPLICATION_HOTFIX_VERSION = packageJson.hotfixVersion;
const APPLICATION_QA_VERSION = packageJson.qaVersion;
const STATIC_FILE_VERSION = process.env.NODE_ENV === 'development'
    ? `${APPLICATION_VERSION}.${APPLICATION_HOTFIX_VERSION}`
    : `${APPLICATION_VERSION}.${APPLICATION_HOTFIX_VERSION}.${APPLICATION_QA_VERSION}`;
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        main: './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'api': path.resolve(__dirname, '../api'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../public", "index.html"),
            favicon: "public/favicon.ico",
            base: "/",
            inject: 'body',
            chunks: ['main'],
        }),
        new MiniCssExtractPlugin({ filename: `bundle.${STATIC_FILE_VERSION}.css` }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'public'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "public", to: "public" },
            ],
        }),
    ],
}
