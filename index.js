const { Server } = require('./lib/server');
const AuthModule = require('./lib/auth-module');
const { database } = require('./lib/db');
const { ERRORS, ConnectionError } = require('./lib/error');
const { logger } = require('./lib/logger');
const { sessionService } = require('./lib/session');
const { userService } = require('./lib/user');
const { validator } = require('./lib/validator');

module.exports.AuthModule = AuthModule;
module.exports.database = database;
module.exports.ERRORS = ERRORS;
module.exports.ConnectionError = ConnectionError;
module.exports.logger = logger;
module.exports.sessionService = sessionService;
module.exports.userService = userService;
module.exports.validator = validator;
module.exports.Server = Server;
