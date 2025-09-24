const path = require('path');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
	mode: 'production',

	devtool: 'source-map',

	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'public'),
		clean: true,
	},

	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
		}),
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, // adding this here for production purpases to extract css into files

					'css-loader', // Translates CSS into CommonJS

					'sass-loader', // Compiles Sass to CSS
				],
			},
		],
	},
});
