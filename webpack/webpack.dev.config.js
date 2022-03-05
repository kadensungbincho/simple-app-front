const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let REST_BASE = process.env.REST_BASE || 'http://localhost:8080/'

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    devServer: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
        hot: true,
        static: path.resolve(__dirname, '../public'),
        proxy: {
            "/api": {
                target: REST_BASE,
                "secure": false,
                changeOrigin: true,
            },
        }
    },
    plugins: [
        new ReactRefreshWebpackPlugin()
    ],
});
