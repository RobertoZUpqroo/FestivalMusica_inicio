const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const webp = require('gulp-webp');

function css(done){
    src('src/scss/app.scss')    //Identifica el archivo SASS
    .pipe(plumber())               //Compila el archivo SASS
    .pipe(sass())               //Compila el archivo SASS
    .pipe(dest('build/css'));   //Almacena en la hoja de estilo

    done(); //Callback para notificar a GULP cuando termine la función
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

function dev(done){
    watch("src/scss/**/*.scss", css);
    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);