// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply'), chalk = require('chalk'), es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'), clean = require('gulp-clean');
var dist = "./lib/";

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('js', function() {
  return gulp.src(['./src/app/JayData.kendo.extensions.js'])
        .pipe(gulp.dest(dist));
});
gulp.task('css', function () {
  return gulp.src(['./src/css/styles.css'])
        .pipe(gulp.dest(dist+"css/"));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src(dist+'**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['js','css'], function (callback) {
  callback();
  console.log('\nPlaced optimized files in ' + chalk.magenta(dist + '\n'));
});
