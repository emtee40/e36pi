import express from 'express';
import gzip from 'compression';
import {urlencoded, json} from 'body-parser';
import session from 'express-session';
import winston from 'winston';
import config from '../config/default.json';
import morgan from 'morgan';

import httpUtils from './util/http';
import io from 'socket.io';

global.config = config;

global.log = new winston.Logger({
	transports: [
		new winston.transports.Console(global.config.log),
	],
});

const tasks = {
	setupHTTPServer: () => {
		return new Promise((resolve, reject) => {
			global.log.info('BOOTSTRAP','HTTP-SERVER','Preparing HTTP Server with args:', global.config.http);

			let httpServer = express();

			httpServer
			.use(gzip())
			.use(urlencoded({extended: true}))
			.use(json())
			.use(morgan('dev'))
			.use(httpUtils.filter.enableCORS)
			.use(httpUtils.filter.errorHandler)
			.use(express.static('../frontend/build'));

			module.exports.server = httpServer.listen(global.config.http.port, () => {
				global.httpServer = httpServer;

				global.log.info('BOOTSTRAP','HTTP-SERVER','Ready at:', `http://0.0.0.0:${global.config.http.port}/`);
				resolve();
			}).on('error', (err) => {
				reject(err);
			});
		});
	},
	/*startWsckManager: () => {
		return new Promise((resolve, reject) => {
			let ioInstance = io(module.exports.server);
			wsManager.setup(ioInstance, sessionStore);
		});
	},*/
};

Promise.resolve()
	.then(() => tasks.setupHTTPServer())
	//.then(() => tasks.startWsckManager())
	.catch((e) => {
		global.log.error('BOOTSTRAP', 'Application bootstrap failed');
		global.log.error(e);
		process.exit(1);
	});
