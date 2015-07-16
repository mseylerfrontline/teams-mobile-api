var gulp = require('gulp');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var runSequence = require('run-sequence');
var moment = require('moment');

var paths = {
   coffee: ['./**/*.coffee', '!./districts/**', '!./node_modules/**']
};

gulp.task('clean:lib', function (cb) {
   del(['./build/**/*'], cb)
})

gulp.task('move:lib', function () {
   return gulp.src('./package.json')
      .pipe(gulp.dest('./build/'))
})

gulp.task('coffee', function () {
   return gulp.src(paths.coffee)
      .pipe(sourcemaps.init())
      .pipe(coffee().on('error', gutil.log))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build/'))
})

gulp.task('zip', function () {
   return gulp.src('./build/**/*')
      .pipe(zip(  moment().format('MM.DD.YY-hh.mm')+'.zip'  ))
      .pipe(gulp.dest('./bin/'))
})

gulp.task('build', function (cb)
{
   runSequence('clean:lib', ['coffee', 'move:lib'], 'zip', cb);
})

gulp.task('default', ['build']);
