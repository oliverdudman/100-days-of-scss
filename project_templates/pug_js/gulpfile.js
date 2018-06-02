var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var pug = require("gulp-pug");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

gulp.task("sass", function() {
  return sass("app/scss/*.scss")
  .pipe(gulp.dest("app/css"))
  .pipe(reload({stream: true}));
});

gulp.task("pug", function() {
  return gulp.src("app/views/*.pug")
  .pipe(pug())
  .pipe(gulp.dest("app"))
  .pipe(reload({stream: true}));
});

gulp.task("serve", ["sass", "pug"], function() {
  browserSync({
    server: {
      baseDir: "app"
    }
  });

  gulp.watch("app/scss/*.scss", ["sass"]);
  gulp.watch("app/views/*.pug", ["pug"]);
  gulp.watch("app/js/*.js", reload);
});
