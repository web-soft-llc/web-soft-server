const fs = require('fs');
const { Server, logger } = require('../index');
const modules = require('./modules');

const key = fs.readFileSync('./certs/localhost.key');
const cert = fs.readFileSync('./certs/localhost.crt');

const start = async () => {
  try {
    const server = new Server({ host: 'localhost', port: 443, cors: false, key, cert, secure: true });
    server.start(modules);
  } catch (error) {
    logger.fatal(error);
  }
};

start();
