var gulp = require('gulp');
var compass = require('gulp-compass');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var es = require('event-stream');
var browserSync = require("browser-sync").create();

gulp.task('copy', function () {
    return es.concat(
        gulp.src('./node_modules/materialize-css/dist/**/*', {base: './node_modules/materialize-css/dist'})
            .pipe(gulp.dest('./dist/')),
        gulp.src('./node_modules/jquery/dist/**/*', {base: './node_modules/jquery/dist'})
            .pipe(gulp.dest('./dist/js')),
        gulp.src('./src/js/**', {base: './src/js'})
            .pipe(gulp.dest('./dist/app'))
    );
});

gulp.task('compass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './dist/css',
            sass: './src/sass'
        }));
});

gulp.task('template', function () {
    var templateData = {};
    var options = {
        batch: ['./src/partials'],
        helpers: {}
    };

    return gulp.src('src/pages/**/*.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename(function (path) {
            path.extname = ".html";
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['default'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch('./src/sass/**/*.scss', ['compass']);
    gulp.watch(['./dist/**/*.css']).on("change", function(file) {
        browserSync.reload(file.path);
    });

    gulp.watch('./src/**/*.handlebars', ['template']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['copy', 'compass', 'template']);
