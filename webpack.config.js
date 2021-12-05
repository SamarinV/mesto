const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = (env, args) => {
	const map = args.mode === 'production' ? [
		MiniCssExtractPlugin.loader, {
			loader: "css-loader",
			options: {
				importLoaders: 1
			}
		},
		"postcss-loader"
	] : [
		MiniCssExtractPlugin.loader, "css-loader"
	]
	return {
		entry: './src/index.js',
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		devtool: args.mode === 'development' ? 'source-map' : false,
		plugins: [
			new HTMLWebpackPlugin({
				template: './src/index.html',
			}),
			new MiniCssExtractPlugin(),
		],
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
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
					}
				},
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
					use: map
				},


			],
		},
	}
}
