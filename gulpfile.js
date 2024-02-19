const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    src('src/scss/app.scss')    //Identifica el archivo SASS
    .pipe(plumber())               //Compila el archivo SASS
    .pipe(sass())               //Compila el archivo SASS
    .pipe(dest('build/css'));   //Almacena en la hoja de estilo

    done(); //Callback para notificar a GULP cuando termine la función
}

function imagenes( done ) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin(opciones) ) )
    .pipe( dest('build/img'))
    done();
}

function versionWebp(done){

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe( dest('build/img'))

    done();
}

function versionAvif(done){

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe( dest('build/img'))

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp, versionAvif, dev);