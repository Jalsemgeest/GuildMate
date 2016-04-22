'use strict';

process.env.NODE_ENV = 'development';

// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var path = require('path');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');

var config = {
	js:[
		{
			files:[
			"./js/components/home/home.jsx"
			],
			outputFile:'../public/js/home.js'
		}
		// {
		// 	files:[
		// 	"./js/components/song.jsx",
		// 	"./js/components/history.jsx",
		// 	"./js/components/playlist.jsx",
		// 	"./js/components/youtubesearch.jsx",
		// 	"./js/components/menuarea.jsx",
		// 	"./js/components/videoplayur.jsx",
		// 	"./js/components/dashboard.jsx"
		// 	],
		// 	outputFile:'dashboard.js'
		// }
	]
};

// Task
gulp.task('server', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: './app.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('./app.js')
			.pipe(notify('Reloading page, please wait...'))
			.pipe(livereload());
	})
});

gulp.task('compile-jsx', function() {
	try {
		for (var i = 0; i < config.js.length; i++) {
			console.log(i);
			gulp.src(config.js[i].files)
			.pipe(plumber({
		        handleError: function (err) {
		            console.log(err);
		            this.emit('end');
		        }
		    }))
		    .pipe(concat(config.js[i].outputFile))
		    .pipe(react())
		    .pipe(browserify({
			  insertGlobals : true
			}))
			.pipe(gulp.dest('js'))
			.pipe(livereload());
		}
	} catch (ex) { }
	return;
});

gulp.task('compile-stylus', function() {
	try {
		console.log('Compiling stylus...');
		return gulp.src('./css/**/*.styl')
			.pipe(plumber({
				handleError: function(err) {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(stylus())
			.pipe(gulp.dest('./public/css'))
			.pipe(livereload());
	} catch (ex) {}
	return;
});

gulp.task('watch-all', function() {
	livereload.listen();
	gulp.watch(['./js/components/**/*.jsx',
	 './js/actions/**/*.js',
	  './js/constants/**/*.js',
	  './js/dispatcher/**/*.js',
	  './js/stores/**/*.js'],
	   ['compile-jsx']);
	gulp.watch('./css/**/*.styl', ['compile-stylus']);
});

gulp.task('default', ['server', 'react-compile', 'stylus-compile', 'watch-all'])