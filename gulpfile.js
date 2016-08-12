var del     = require('del');
var es      = require('event-stream');
var gulp    = require('gulp');
var os      = require('os');
var path    = require('path');
var webpack = require('webpack-stream');

const id = 'com.marktrapp';
const name = 'HttpHmacV2';

const extFile = './src/' + name + '.js';

const buildDir = 'dist';
const buildDest = path.join(__dirname, buildDir, id + '.' + name);

const extDir = path.join(os.homedir(), '/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions');
const installDir = path.join(extDir, id + '.' + name);

gulp.task('build', ['clean'], function () {
    var buildExtension = gulp.src(extFile)
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest(buildDest));

    var copyDocs = gulp.src(['./README.markdown', './LICENSE'])
        .pipe(gulp.dest(buildDest));

    return es.merge(buildExtension, copyDocs);
});

gulp.task('clean', function () {
    del.sync([buildDir]);
});

gulp.task('uninstall', function () {
    del.sync([installDir], { force: true });
})

gulp.task('install', ['build', 'uninstall'], function () {
    return gulp.src(path.join(buildDest, '/**/*'))
        .pipe(gulp.dest(installDir));
});

gulp.task('watch', ['install'], function () {
    gulp.watch(extFile, ['build', 'install']);
});

gulp.task('default', ['watch']);
