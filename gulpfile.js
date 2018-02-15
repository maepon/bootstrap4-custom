"use strict"

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass =require('gulp-sass')
const postcss =require('gulp-postcss')
const autoprefixer =require('autoprefixer')
const watch = require('gulp-watch')
const cssmqpacker = require('css-mqpacker')
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps')
const sassGlob = require('gulp-sass-glob')
const data = require('gulp-data')
const util = require('gulp-util')
const rename = require('gulp-rename')
const ejs = require('gulp-ejs')

const SRC = {
  css: 'src/assets/_scss/**/*.scss',
  cssDir: 'src/assets/_scss/',
  ejs: [
    'src/_ejs/**/*.ejs',
    '!src/_ejs/**/_*.ejs'
  ],
  ejsDir: 'src/_ejs/'
}

const DEST = {
  css: 'htdocs/assets/css/',
  html: 'htdocs/'
}

const sassOption = {
  includePaths: 'node_modules/bootstrap/scss'
}

const processors_dev = [
  autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
  cssmqpacker
]

const processors_release = [
  autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
  cssmqpacker,
  cssnano
]

const plumberObj = {
  errorHandler: function(err) {
    console.log(err.messageFormatted);
    this.emit('end');
  }
}

gulp.task('css', () => {

return gulp
  .src([SRC.css])
  .pipe(plumber(plumberObj))
  .pipe(sassGlob())
  .pipe(sourcemaps.init())
  .pipe(sass(sassOption))
  .pipe(postcss(processors_dev))
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest(DEST.css))
})

gulp.task('cssrelease', () => {

  return gulp
    .src([SRC.css])
    .pipe(plumber(plumberObj))
    .pipe(sassGlob())
    .pipe(sass(sassOption))
    .pipe(postcss(processors_release))
    .pipe(gulp.dest(DEST.css))
})

gulp.task('ejs',() => {
  return gulp
    .src(SRC.ejs)
    .pipe(plumber())
    .pipe(data(
      file => {
        return {
          filename: file.path,
          devdir: SRC.ejsDir
        }
      }
    ))
    .pipe(
      ejs()
        .on('error',util.log)
    )
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(DEST.html))

})

gulp.task('default', () => {
  gulp.start(['css','ejs'])

  watch(SRC.css, () => {
    gulp.start(['css'])
  })
  watch(SRC.ejs, () => {
    gulp.start(['ejs'])
  })
})

gulp.task('release', () => {
  gulp.start(['cssrelease'])
})
