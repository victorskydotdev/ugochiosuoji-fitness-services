const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'none',

	entry: './src/index.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'public'),
	},

	plugins: [
		// landing page template
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			// chunks: ""
			inject: 'body',
			// favicon: "",
		}),

		// contact page template
		new HtmlWebpackPlugin({
			template: './src/html/contact.html',
			filename: 'contact/index.html',
			// chunks: "",
			inject: 'body',
			// favicon: "",
		}),

		// blog page template
		new HtmlWebpackPlugin({
			template: './src/content/blog-page.html',
			filename: 'blog/index.html',
			// chunks: "",
			inject: 'body',
			// favicon: "",
		}),

		// blog-post page template
		new HtmlWebpackPlugin({
			template: './src/content/blog-post.html',
			filename: 'blog/blog-post.html',
			// chunks: "",
			inject: 'body',
			// favicon: "",
		}),
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},

			// as of Webpack v5, we use asset/resource to copy the image to the dist folder. No need to install any extra loaders.
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name]-[hash][ext]',
				},
			},

			{
				test: /\.html$/,
				use: ['html-loader'], // process the HTML files
			},
		],
	},
};
