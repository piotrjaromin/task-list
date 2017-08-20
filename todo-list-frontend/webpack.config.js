const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/dist');
const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
    devtool: "cheap-module-source-map",
    entry: {
        app: APP_DIR + '/app.js',
        vendor: ["jquery", "bootstrap", "moment", "react", "react-dom", "react-router"]
    },
    output: {
        path: BUILD_DIR,
        filename: 'js/app.js'
    },
    module: {
        loaders: [
            {test: /\.js?/, include: APP_DIR, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]"},
            {test: /\.scss$/, loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]},
            {test: /\.(woff|woff2)$/, loader: "url-loader?name=fonts/[name].[ext]&prefix=font/&limit=5000"},
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream"
            },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml"}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({names: "vendor", filename: "js/vendor.js"}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false,
            sourceMap: false,
            mangle: true,
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    externals: {
        'Config': JSON.stringify(process.env.ENV === 'production' ? require('./config/prod.json') : require('./config/test.json'))
    }
};

module.exports = config;
