const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));

function css(done){
    src('src/scss/app.scss')    //Identifica el archivo SASS
    .pipe(sass())               //Compila el archivo SASS
    .pipe(dest('build/css'));   //Almacena en la hoja de estilo

    done(); //Callback para notificar a GULP cuando termine la función
}

function dev(done){
    watch("src/scss/app.scss", css);
    done();
}

exports.css = css;
exports.dev = dev;