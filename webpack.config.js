const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
	entry: './src/index.js',
	output: {
		globalObject: "this",
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
	],
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
		],
	},
	// devtool: "source-map",
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 9000,
	},
	module: {
		rules: [
			{
				test: /\.(ico|gif|png|jpg|jpeg|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[hash][ext][query]'
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot||otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext][query]'
				}
			},

			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, {
					loader: "css-loader",
					options: {
						importLoaders: 1
					}
				},
					"postcss-loader"
				]
			},

			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
				}
			},

		],
	},
}
