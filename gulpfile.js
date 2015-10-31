var gulp = require('gulp');
var compass = require('gulp-compass');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var es = require('event-stream');
var livereload = require('gulp-livereload');

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

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/**/*', ['default', 'reload'])
});

gulp.task('reload', function() {
    livereload.reload();
});

gulp.task('default', ['copy', 'compass', 'template']);
