'use strict';

var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    browserify  = require('gulp-browserify'),
    babel       = require('gulp-babel'), 
    babelify    = require('babelify'), 
    cache       = require('gulp-cache'),
    cached      = require('gulp-cached'),
    concat      = require('gulp-concat'),
    cssnano     = require('gulp-cssnano'),
    debug       = require('gulp-debug'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    minify      = require('gulp-babel-minify'),
    newer       = require('gulp-newer'),
    rename      = require('gulp-rename-plus'),
    remember    = require('gulp-remember'),
    pngquant    = require('imagemin-pngquant'),
    prefixer    = require('gulp-autoprefixer'),
    pug         = require('gulp-pug'),
    vueify      = require('gulp-vueify'),
    uglify      = require('gulp-uglifyjs'),
    sass        = require('gulp-sass'),
    source      = require('vinyl-source-stream'),
    sourcemaps  = require("gulp-sourcemaps");


gulp.task('pug', function() {
    return gulp.src('app/pug/index.pug')
        .pipe(pug({pretty : true}))
        .pipe(gulp.dest('app'));
});

gulp.task('allScripts', function() {
    return gulp.src([
                'app/libs/jquery/dist/jquery.js',
                'app/libs/axios/dist/axios.min.js',
                'app/libs/jquery-validation/dist/jquery.validate.min.js'])
            .pipe(newer('app/js/libs.js'))
            .pipe(sourcemaps.init())
            .pipe(debug())
            .pipe(concat('libs.js'))
            //.pipe(minify())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest('app/js'))
            .pipe(browsersync.reload({stream: true}));
});


gulp.task('browsersync', function(){
    browsersync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});


gulp.task('clean', function(){
    return del.sync('dist');
});


gulp.task('cleaner', function(){
    return cache.clearAll();
});


gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('js', function() {
    return gulp.src(['./app/components/main.js'])
        .pipe(sourcemaps.init())
        .pipe(debug())
        .pipe(browserify({
            transform: ['babelify', [{_flags: {debug: true}}, 'vueify']]
        }))
        .pipe(debug())
        //.pipe(rename({suffix : 'min.js'}))
        //.pipe(uglify())
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest('./app/js'))
        .pipe(browsersync.reload({stream: true}));
});

gulp.task('sass', function() {
    return gulp.src(['app/sass/style.sass'])
        .pipe(sourcemaps.init())
        .pipe(debug())
        .pipe(sass())
        .pipe(prefixer({
            cascade: true
        }))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest('app/css/'))
        .pipe(browsersync.reload({stream: true}));
});

gulp.task('csslibs', ['sass'], function() {
    return gulp.src('app/css/style.css')
        .pipe(sourcemaps.init())
        .pipe(debug())
        .pipe(cssnano())
        .pipe(rename({suffix : 'min.css'}))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest('app/css/min'))
        .pipe(browsersync.reload({stream: true}));
});




gulp.task('build', ['clean'], function(){
    var buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));
    
    var buildFont = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildLibsCss = gulp.src('app/libs/**/*.css')
        .pipe(gulp.dest('dist/libs'));

    var buildLibs = gulp.src('app/libs/**/*.js')
        .pipe(gulp.dest('dist/libs'));

    var buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    var buildJson = gulp.src('app/json/*.json')
        .pipe(gulp.dest('dist/json'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist'));

    var buildImg = gulp.src(['app/img/**/*.png','app/img/**/*.jpg'])
        .pipe(gulp.dest('dist/img'));
});



gulp.task('watch', ['browsersync', 'pug', 'sass', 'csslibs', 'js', 'allScripts'], function() {
    gulp.watch(['app/sass/**/*.sass', 'app/components/**/*.sass'], ['sass', 'csslibs'], browsersync.reload);
    gulp.watch('app/pug/**/*.pug', ['pug']);
    gulp.watch('app/components/**/*.vue', ['js'],  browsersync.reload);
    gulp.watch('app/components/main.js', ['js'],  browsersync.reload);
    gulp.watch('app/*.html',     browsersync.reload);
});
