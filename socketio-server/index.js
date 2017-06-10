/* eslint no-console: 0 */

const express = require('express');
const socketio = require('./init-socketio.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3001 : process.env.PORT;
const app = express();

const server = app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

// socket.io set-up
socketio.init(server);
