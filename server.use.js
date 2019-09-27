const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['Authorization', 'Content-Type', 'Origin', 'X-Requested-With', 'Accept'],
  exposeHeaders: ['API-Token-Expiry'],
});

const init = (server, restify) => {
  server.pre(cors.preflight);
  server.use(cors.actual);

  server.defaultResponseHeaders = () => {
    this.header('Content-Type', 'application/json');
  };

  server.use(restify.plugins.conditionalRequest());
  server.use(restify.plugins.bodyParser({ mapParams: true }));
  server.use(restify.plugins.queryParser({ mapParams: true }));

  server.on('restifyError', (req, res, err, callback) => {
    console.log(err);
    return callback();
  });

  process.on('unhandledRejection', (reason) => {
    console.log('unhandledRejection');
    console.log(reason);
  });

  process.on('uncaughtException', (err) => {
    console.log('uncaughtException');
    console.log(err);
  });
};

exports.set = init;
