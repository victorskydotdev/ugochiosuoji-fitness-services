const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		hot: true,
		port: 9000,
		compress: true,
		open: true,
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		// clean: true,
	},

	module: {
		rules: [
			// {
			// 	test: /\.scss$/,
			// 	use: [
			// 		MiniCssExtractPlugin.loader, // adding this here for production purpases to extract css into files

			// 		'css-loader', // Translates CSS into CommonJS

			// 		'sass-loader', // Compiles Sass to CSS
			// 	],
			// },

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
});
