const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
// const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();


function scssTask(){
    return src("app/**/*.scss", { sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', {sourcemaps:'.'}));
}
// JS task
// function jsTask(){
//     return src("script.js", {sourcemap: true})
//     .pipe(terser())
//     .pipe(dest('dist', { sourcemaps:'.'}));
// }

// Browsersync Task= initialize the server
function browserSyncServe(cb){
    browserSync.init({
        server:{
            baseDir:'.'
        }
    });
    cb();
}
// Reload the server when make code changes
function browserSyncReload(cb){
    browserSync.reload();
    cb();
}

function watchTask(){
    watch("*.html" , browserSyncReload);
    watch(['app/**/*.scss', 'js/**/*.js'], series(scssTask, browserSyncReload));
}

exports.default = series(scssTask, browserSyncServe, watchTask);