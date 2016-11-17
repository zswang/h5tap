/*jshint globalstrict: true*/
/*global require*/

'use strict';

var gulp = require('gulp');
var util = require('util');
var jdists = require('gulp-jdists');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var examplejs = require('gulp-examplejs');

gulp.task('example', function() {
  return gulp.src([
      'src/**/*.js'
    ])
    .pipe(examplejs({
      header: `
var h5tap = require('../');
      `
    }))
    .pipe(gulp.dest('test'));
});

gulp.task('build', function() {
  return gulp.src(['src/h5tap.js'])
    .pipe(jdists({
      trigger: 'release',
      remove: 'remove,debug,test,safe'
    }))
    .pipe(rename('h5tap.js'))
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(rename('h5tap.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);
