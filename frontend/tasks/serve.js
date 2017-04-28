import gulp from  'gulp';
import browserSync from 'browser-sync';
import {argv} from 'yargs';

let bs = browserSync.create();

gulp.task('serve', () => {

	bs.init({
		port: 8081,
		/*proxy: {
			target: argv.proxy || 'http://localhost:3000',
			ws: true,
		},*/
		//middleware: [require('connect-history-api-fallback')()],
		serveStatic: ['./build'],
		reloadDelay: 100,
		open: argv.open,
	});

	gulp.watch(
		['./src/**/*.html', './src/**/*.jpg','./src/**/*.jpeg', './src/**/*.png', './src/**/*.svg' ],
		['build:copyStaticFiles']
	).on('change',bs.reload);

	gulp.watch(
		['./src/**/*.scss'],
		['build:sass']
	).on('change',() => {
		bs.stream({match: '**/*.css'});
	});

	gulp.watch(
		['./src/**/*.ts'],
		['build:angular2','build:copyStaticFiles']
	).on('change',bs.reload);
});

module.exports = {
	browserSync: () => bs,
};
