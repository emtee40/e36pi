import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import {browserSync} from './serve';

function errorHandler(err) {
	let message = new gutil.PluginError('gulp-sass', err.messageFormatted).toString();
	process.stderr.write(message + '\n');
	gutil.beep();
};

gulp.task('build:sass', () => {
	gulp
	.src('./src/styles/**/*.scss')
	.pipe(plumber({errorHandler}))
    //TODO inject
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/styles/'))
    .pipe(browserSync().stream({match: '**/*.css'}));
});

gulp.task('build:angular2', () => {
	let tsProject = ts.createProject('./tsconfig.json');
	return gulp.src('./src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build'));
});

gulp.task('build:copyLibs', () => {
	return gulp
		.src([
			'*/core-js/**/*',
			'*/zone.js/**/*',
			'*/systemjs/**/*',
			'*/rxjs/**/*',
			'*/@angular/**/*',
			'*/socket.io-client/**/*',
			'*/jquery/**/*',
			'*/fullpage.js/**/*',
			'!*/**/*.ts',
		], {base: './node_modules'})
		.pipe(gulp.dest('build/js/lib'));
});

gulp.task('build:copyStaticFiles', () => {
	gulp
	.src([
		'node_modules/font-awesome/fonts/**/*',
		'node_modules/material-design-icons/iconfont/*.ttf',
		'node_modules/material-design-icons/iconfont/*.eot',
		'node_modules/material-design-icons/iconfont/*.woff',
		'node_modules/material-design-icons/iconfont/*.woff2',
	])
	.pipe(gulp.dest('build/fonts'));

	return gulp
		.src([
			'./src/**/*',
			'!./src//**/*.ts',
			'!./src//**/*.scss',
		]).pipe(gulp.dest('./build/'));
});

gulp.task('build',['build:sass','build:copyLibs','build:angular2','build:copyStaticFiles']);
