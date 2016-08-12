var path = require('path');

const id = 'com.marktrapp';
const name = 'HttpHmacV2';

const extFile = './src/' + name + '.js';

const buildDir = 'dist';
const buildDest = path.join(__dirname, buildDir, id + '.' + name);

const config = {
    target: 'web',
    entry: [
        extFile
    ],
    output: {
        path: buildDest,
        publicPath: buildDir,
        filename: name + '.js'
    },
    resolve: {
        modulesDirectories: ['node_modules']
    },
}

module.exports = config
