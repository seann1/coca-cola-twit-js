const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("./public/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(".public/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./public/scss/**/*.scss", style);
  gulp.watch("./public/*.html").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
