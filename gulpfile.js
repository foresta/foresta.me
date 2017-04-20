var gulp        = require('gulp');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var run         = require('gulp-run');
var source      = require('vinyl-source-stream');
var browserSync = require('browser-sync');

gulp.task("sass", function(){
   gulp.src("./src/sass/**/*.scss")
       .pipe(plumber())
       .pipe(sass())
       .pipe(gulp.dest("./stylesheets"));
});

gulp.task("html", function(){
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("."));
});

gulp.task("reload", function(){
  browserSync.reload();
});

gulp.task('watch', function(){

  browserSync({
    server: {
      baseDir: ".",
      index: "index.html"
    }
  });

  // sassのビルド
  gulp.watch("./src/sass/**/*.scss", ["sass"]);

  // htmlの移動
  gulp.watch("./src/**/*.html", ["html"]);

  // live reload
  gulp.watch(["./stylesheets/**/*.css", "./javascripts/index.js", "./**/*.html"], ["reload"]);
});

gulp.task("default", ['watch', 'html', 'sass']);
