var gulp = require('gulp');
// var imagemin = require('gulp-imagemin');
// var autoprefix = require('gulp-autoprefixer');
// var minifyCSS = require('gulp-minify-css');
// var concat = require('gulp-concat');
var babel = require('gulp-babel');
var debug = require('gulp-debug');
// var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
// del = require('del');

gulp.task('clean', function () {
    return gulp.src(['build/*','tmp/*'], {read: false})
        .pipe(clean());
    return del(['build','.tmp']);
});

// gulp.task('imagemin', ['clean'], function() {
//     var img_src = 'src/images/**/*', img_dest = 'build/images';
//
//     gulp.src(img_src)
//         .pipe(imagemin())
//         .pipe(gulp.dest(img_dest));
// });


// gulp.task('gulp-sass', function() {
//     gulp.src('src/sass/*.scss')
//         .pipe(sass())
//         .pipe(minifyCSS())
//         .pipe(gulp.dest('build/styles'));
// });


// gulp.task('styles', ['gulp-sass'],function() {
//     gulp.src('src/styles/*.css')
//         .pipe(concat('styles.css'))
//         .pipe(autoprefix('last 2 versions'))
        // .pipe(minifyCSS())
        // .pipe(gulp.dest('build/styles'));
// });


// gulp.task("babel", ['clean'],function(){
gulp.task("babel", ['clean']
    ,function(){
    return gulp.src("src/jsx/*.jsx").
    pipe(babel({
        plugins: ['transform-react-jsx']
    }))

        // .pipe(debug({title: 'unicorn:'}))
        .on('error', function(e) {
            console.log('>>> ERROR', e);
            // emit here
            this.emit('end');
        })
        .

    pipe(gulp.dest("tmp/js"));
});


// gulp.task('copy-scripts', ['babel'], function() {
//     gulp.src('src/js/*.js')
//     Perform minification tasks, etc here
        // .pipe(gulp.dest('.temp/js'));
// });

gulp.task("browserify", ['babel', 'clean'], function(){
    return gulp.src('tmp/js/AppPosta.js')
        .pipe(browserify({
            // insertGlobals: true
        }))

        .on('error', function(e) {
            console.log('>>> ERROR', e);
            // emit here
            this.emit('end');
        })
        .pipe(gulp.dest('build/js/'));
});




// gulp.task('copy-index-html', ['clean'], function() {
//     gulp.src('index.html')
//     Perform minification tasks, etc here
        // .pipe(gulp.dest('build'));
// });
//


// gulp.task('default', ['clean'/*,'imagemin'*/, 'gulp-sass', 'babel', 'copy-scripts', 'browserify', 'copy-index-html'], function() {});
gulp.task('default', ['clean', 'babel', 'browserify'], function() {});


// gulp.task('other', function() {
    // watch for CSS changes
    // gulp.watch('src/**', function() {
        // run styles upon changes
        // gulp.run('browserify');
    // });
// });