const http = require('http');
const port = 8080 || process.env.PORT;
const app = require('./app');
const server = http.createServer(app);

server.listen(port);