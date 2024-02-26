const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps')

// Imagenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JavaScript
const terser = require('gulp-terser-js');

function css(done){
    src('src/scss/app.scss')    //Identifica el archivo SASS
    .pipe(sourcemaps.init())        //Mapea el codigo CSS que se compila
    .pipe(plumber())               //Compila el archivo SASS
    .pipe(sass())               //Compila el archivo SASS
    .pipe(postcss([autoprefixer(), cssnano()]))  //Optimización de codigo
    .pipe(sourcemaps.write('.'))  //Da referencias de dónde se encuentra cada linea de codigo en SASS y dónde modificarlo
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

function javascript(done) {
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp, versionAvif, javascript, dev);