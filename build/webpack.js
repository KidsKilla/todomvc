'use strict';

//var HtmlWebpackPlugin = require('html-webpack-plugin');

var autoPrefixer = require('autoprefixer');
var path = require('path');
var abs = p => path.join(__dirname, '..', p);

module.exports = {
    resolve: {
        alias: {
            'react': abs('node_modules/react/dist/react-with-addons.js'),
            'react-dom': abs('node_modules/react-dom/dist/react-dom.js'),
        },
        modulesDirectories: [
            'node_modules'
        ],
        extensions: ['', '.js'],
    },

    debug: true,

    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                loader: 'babel',
                include: [abs('test'), abs('js')],
                loose: 'all',
                query: {}
            },
            {test: /\.less$/, loader: 'style!css!less!postcss'},
            {test: /\.css$/, loader: 'style!css!postcss'},
        ]
    },
    postcss: [
        autoPrefixer({
            browsers: ['last 2 versions']
        })
    ]
};
