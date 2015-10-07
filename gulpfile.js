/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-sass'),               //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 35729;

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/html/**/*.html',
        htmlDst = './dist/html';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
});

// 样式处理
gulp.task('css', function () {
    var cssSrc = './src/sass/**/*.scss',
        cssDst = './dist/css';
    gulp.src(cssSrc)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(cssDst));
});

// js处理
gulp.task('js', function () {
    var jsSrc = './src/js/**/*.js',
        jsDst ='./dist/js';
    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/html', './dist/js'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', function() {
    //gulp.run('clean');
    //gulp.run('html');
    //gulp.run('css');
    //gulp.run('js');
    gulp.start('html','js','css');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {

    server.listen(port, function(err) {
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/**/*.html', function(event){
            gulp.run('html');
        });

        // 监听css
        //gulp.watch('./src/')
        gulp.watch('./src/sass/**/*.scss', function(){
            gulp.run('css');
        });

        // 监听js
        gulp.watch('./src/js/*.js', function(){
            gulp.run('js');
        });

    });
});