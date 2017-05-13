module.exports = {
	filter: {

		restrictAcceptJSON: (req, res, next) => {
			if (req.method === 'POST' && req.get('content-type') !== 'application/json') {
				return res.error(new Error('Content-type not acceptable'), 406);
			}
			next();
		},

		errorHandler: (req, res, next) => {
			res.error = (err, status) => {
				global.log.error(err.stack);
				res.status(status || 500).json({
					message: err.message || 'Internal Server Error',
				});
			};
			next();
		},

		enableCORS: (req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			next();
		},

		noCache: (req, res, next) => {
			res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
			res.header('Expires', '-1');
			res.header('Pragma', 'no-cache');
			next();
		},
	},
};
