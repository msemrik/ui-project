var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
del = require('del');

gulp.task('clean', function () {
    // return gulp.src(['build','.temp'], {read: false})
    //     .pipe(clean());
    return del(['build','.temp']);
});

// gulp.task('imagemin', ['clean'], function() {
//     var img_src = 'src/images/**/*', img_dest = 'build/images';
//
//     gulp.src(img_src)
//         .pipe(imagemin())
//         .pipe(gulp.dest(img_dest));
// });


gulp.task('gulp-sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/styles'));
});


// gulp.task('styles', ['gulp-sass'],function() {
//     gulp.src('src/styles/*.css')
//         .pipe(concat('styles.css'))
//         .pipe(autoprefix('last 2 versions'))
        // .pipe(minifyCSS())
        // .pipe(gulp.dest('build/styles'));
// });


gulp.task("babel", ['clean'],function(){
    return gulp.src("src/jsx/*.jsx").
    pipe(babel({
        plugins: ['transform-react-jsx']
    })).
    pipe(gulp.dest(".temp/js"));
});


gulp.task('copy-scripts', ['babel'], function() {
    gulp.src('src/js/*.js')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('.temp/js'));
});

gulp.task("browserify", ['copy-scripts'],  function(){
    return gulp.src('.temp/js/index.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest('build/js'));
});




gulp.task('copy-index-html', ['clean'], function() {
    gulp.src('index.html')
    // Perform minification tasks, etc here
        .pipe(gulp.dest('build'));
});



gulp.task('default', ['clean'/*,'imagemin'*/, 'gulp-sass', 'babel', 'copy-scripts', 'browserify', 'copy-index-html'], function() {});


gulp.task('other', function() {
    // watch for CSS changes
    gulp.watch('src/**', function() {
        // run styles upon changes
        gulp.run('browserify');
    });
});