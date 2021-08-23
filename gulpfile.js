const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const postcssUrl = require("postcss-url");
const postcssImport = require("postcss-import");
const postScss = require("postcss-scss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgsprite = require("gulp-svg-sprite");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(postcss([
      postcssImport(),
      postcssUrl(),
    ], { syntax: postScss }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(sync.stream());
}

exports.styles = styles;

 // HTML

 const html = () => {
   return gulp.src("source/*.html")
   .pipe(htmlmin({ collapseWhitespace: true }))
   .pipe(gulp.dest("build"));
 }

exports.html = html;


// Script

const script = () => {
  return gulp.src("source/js/script.js")
  .pipe(terser())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"));
}

exports.script = script;


// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{svg, jpg, png}")
  .pipe(squoosh())
  .pipe(gulp.dest("build/img"));
}

exports.images = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{svg, jpg, png}")
  .pipe(gulp.dest("build/img"));
}

exports.images = copyImages;


// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg, png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/icons/*.svg")
  .pipe(svgsprite())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/icons"));
}

exports.sprite = sprite;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, html, script, copyImages, createWebp, sprite, server, watcher
);
