var gulp = require('gulp');
var compass = require('gulp-compass');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

gulp.task('copy', function () {
    gulp.src('./node_modules/materialize-css/dist/**/*', {base: './node_modules/materialize-css/dist'})
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './dist/css',
            sass: './src/sass'
        }));
});

gulp.task('js', function () {
    return gulp.src('lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
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

gulp.task('default', ['copy', 'compass', 'js', 'template']);
