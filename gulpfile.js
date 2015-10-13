'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var pagespeed = require('psi');

var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', () =>
	gulp.src('./js/**')
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
);

// Optimize Images
gulp.task('images', () =>
	gulp.src('./site-assets/*.{png,jpg,svg}')
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('./dist/site-assets'))
		.pipe($.size({title: 'images'}))
);

// Copy All Files At The Root Level (app)
gulp.task('copy', () =>
	gulp.src([
		//'site-assets/favicon.ico'
	], {
		dot: true,
		base: './'
	}).pipe(gulp.dest('./dist'))
	.pipe($.size({title: 'copy'}))
);

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', () =>
	// For best performance, don't add Sass partials to `gulp.src`
	gulp.src([
		'./site-assets/*.css'
	])
	.pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe($.size({title: 'styles'}))
	.pipe(gulp.dest('./dist/site-assets'))
);

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', () =>
	gulp.src('index.html')
		.pipe(assets)

		// Concatenate And Minify JavaScript
		.pipe($.if('*.js', $.uglify({preserveComments: 'some'})))

		// Concatenate And Minify Styles
		.pipe($.if('*.css', $.csso()))
		.pipe(assets.restore())
		.pipe($.useref())

		// Output Files
		.pipe(gulp.dest('./dist'))

		// Running vulcanize over the written output
		// because it requires access to the written
		// CSS and JS.
		.pipe($.vulcanize({ dest: './dist', strip: true }))
		.pipe($.size({title: 'html'}))
);

// Clean Output Directory
gulp.task('clean', () => del(['./dist']));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], cb =>
	runSequence(
		['styles', 'copy'],
		['jshint', 'html', 'images'],
		cb
	)
);
