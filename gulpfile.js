var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var header = require('gulp-header');

var pkg = require('./package.json');

gulp.task('build', function() {
	return gulp.src([
			'src/parser.js',
			'src/utils.js',
			'src/texture.js',
			'src/backend/GPUCore.js',
			'src/gpu.js',
			'src/backend/functionNode_webgl.js',
			'src/backend/functionNode.js',
			'src/backend/functionBuilder.js',
			'src/backend/mode_cpu.js',
			'src/backend/mode_gpu.js',
			'src/wrapper/suffix.js'
		])
		.pipe(concat('gpu.js'))
		.pipe(header(fs.readFileSync('src/wrapper/prefix.js', 'utf8'), { pkg : pkg } ))
		.pipe(gulp.dest('bin'));
});

gulp.task('minify', ['build'], function() {
	return gulp.src(['bin/gpu.js'])
		.pipe(rename('gpu.min.js'))
		.pipe(uglify({
			mangle: false,
			preserveComments: "license"
		}).on('error', gutil.log))
		.pipe(gulp.dest('bin'));
});

gulp.task('default', ['minify']);
