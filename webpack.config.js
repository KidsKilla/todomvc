'use strict';

module.exports = require('./build/webpack');
module.exports.entry = {
    main: './js/start.jsx'
};
module.exports.output = {
    filename: './dist/bundle.js',
};
