'use strict';
 let gulp = require('gulp'),
	browsersync = require('browser-sync'),
	browserify  = require('gulp-browserify'),
	babelify    = require('babelify'),
	cache       = require('gulp-cache'),
	concat      = require('gulp-concat'),
	debug       = require('gulp-debug'),
	del         = require('del'),
	imagemin    = require('gulp-imagemin'),
	minify      = require('gulp-babel-minify'),
	newer       = require('gulp-newer'),
	pngquant    = require('imagemin-pngquant'),
	prefixer    = require('gulp-autoprefixer'),
	pug         = require('gulp-pug'),
	vueify      = require('gulp-vueify'),
	uglify      = require('gulp-uglifyjs'),
	sass        = require('gulp-sass'),
	sourcemaps  = require("gulp-sourcemaps");


gulp.task('pug', function () {
	return gulp.src('app/pug/index.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('app'));
});

gulp.task('allScripts', function () {
	return gulp.src([
		'app/libs/jquery/dist/jquery.js',
		'app/libs/jquery-validation/dist/jquery.validate.min.js'])
		.pipe(newer('app/js/libs.js'))
		.pipe(sourcemaps.init())
		.pipe(debug())
		.pipe(concat('libs.js'))
		.pipe(minify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('app/js'))
		.pipe(browsersync.reload({stream: true}));
});


gulp.task('browsersync', function () {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});


gulp.task('clean', function () {
	return del.sync('dist');
});


gulp.task('cleaner', function () {
	return cache.clearAll();
});


gulp.task('img', function () {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});


gulp.task('js', function () {
	return gulp.src(['./app/components/main.js'])
		.pipe(sourcemaps.init())
		.pipe(debug())
		.pipe(browserify({
			transform: ['babelify', [{_flags: {debug: true}}, 'vueify']]
		}))
		.pipe(debug())
		//.pipe(rename({suffix : 'min.js'}))
		.pipe(uglify())
		.pipe(sourcemaps.write(""))
		.pipe(gulp.dest('./app/js'))
		.pipe(browsersync.reload({stream: true}));
});

gulp.task('sass', function () {
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

gulp.task('css', ['sass'], function () {
	return gulp.src('app/css/style.css')
		.pipe(sourcemaps.init())
		.pipe(debug())
		//.pipe(rename({suffix: 'min.css'}))
		.pipe(sourcemaps.write(""))
		.pipe(gulp.dest('app/css'))
		.pipe(browsersync.reload({stream: true}));
});


gulp.task('build', ['clean'], function () {
	let buildCss = gulp.src('app/css/**/*.css')
		.pipe(gulp.dest('dist/css'));

	let buildFont = gulp.src(['app/fonts/**/*', 'app/libs/**/*.woff', 'app/libs/**/*.woff2', 'app/libs/**/*.ttf'])
		.pipe(gulp.dest('dist/fonts'));

	let buildLibsCss = gulp.src(['!app/libs/semantic/node_modules/**/*', 'app/libs/**/*.css'])
		.pipe(gulp.dest('dist/libs'));

	let buildLibs = gulp.src(['!app/libs/semantic/node_modules/**/*', 'app/libs/**/*.js'])
		.pipe(gulp.dest('dist/libs'));

	let buildJs = gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'));

	let buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	let buildJson = gulp.src('app/json/*.json')
		.pipe(gulp.dest('dist/json'));

	let buildPhp = gulp.src('app/*.php')
		.pipe(gulp.dest('dist'));

	let buildImg = gulp.src(['app/img/**/*.png', 'app/img/**/*.jpg'])
		.pipe(gulp.dest('dist/img'));
});


gulp.task('watch', ['browsersync', 'pug', 'sass', 'css', 'js', 'allScripts'], function () {
	gulp.watch(['app/sass/**/*.sass', 'app/components/**/*.sass'], ['sass', 'css'], browsersync.reload);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/components/**/*.vue', ['js'], browsersync.reload);
	gulp.watch('app/components/main.js', ['js'], browsersync.reload);
	gulp.watch('app/*.html', browsersync.reload);
});
