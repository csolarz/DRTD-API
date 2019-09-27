/* eslint-disable global-require */
switch (process.env.NODE_ENV) {
  case 'local':
    require('dotenv').config({
      path: 'dev.env',
    });
    break;
  default:
    break;
}

const restify = require('restify');

const API_NAME = 'drtd-api';

const server = restify.createServer({
  name: `${API_NAME}:${process.env.VERSION_API}`,
  acceptable: 'application/json',
  rejectUnauthorized: true,
  ignoreTrailingSlash: true,
  handleUncaughtExceptions: true,
});

const serverUse = require('./server.use');

serverUse.set(server, restify);

server.use(restify.plugins.bodyParser());

server.pre((req, res, next) => {
  req.headers.accept = 'application/json';
  res.charSet('utf-8');
  res.header('Access-Control-Allow-Origin', '*');

  return next();
});

server.get('/api/status', (req, res) => {
  res.send(`service is running: ${process.env.VERSION_API} in ${process.env.NODE_ENV}!!`);
});

server.listen(process.env.PORT || 3101, () => {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
