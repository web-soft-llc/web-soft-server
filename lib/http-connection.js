const { Connection } = require('./connection');

const MIME_TYPES = {
  json: 'application/json'
};

const HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

class HTTPConnection extends Connection {
  constructor(request, modules, response) {
    super(request, modules);
    this.response = response;
  }

  write(data, type = 'json') {
    if (!this.response.writableEnded) {
      const mimeType = MIME_TYPES[type];
      this.response.writeHead(200, { ...HEADERS, 'Content-Type': mimeType });
      this.response.end(data);
    }
  }

  send(data) {
    this.write(JSON.stringify(data), 'json');
  }

  options() {
    if (!this.response.headersSent) {
      this.response.writeHead(200, HEADERS);
      this.response.end();
    }
  }

  async startUserSession(user) {
    this.session = await this.sessionService.startSession(this.request, this.response, user.username);
    this.user = user;
  }

  async deleteUserSession() {
    await this.sessionService.endSession(this.request, this.response);
    this.session = {};
    this.user = {};
  }
}

module.exports = {
  HTTPConnection
};