const dev = process.env.NODE_ENV === 'development';
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "index.html",
    filename: "index.html"
});

const plugins = [new MinifyPlugin()];

if (dev) {
    plugins.push(htmlPlugin);
}

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './bundle.min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ],
    },
    plugins,
};
