require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./router');
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
const cookieParser = require('cookie-parser');

const http = require('http');
const socketio = require('socket.io');
const { room, message } = require('./models');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [clientUrl],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  }),
);
app.get('/', (res, req) => {
  console.log('hello world');
  req.status(200).json('hi');
});
app.use('/', router);
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
if (fs.existsSync('../key.pem') && fs.existsSync('../cert.pem')) {
  //https 서버
  const privateKey = fs.readFileSync(__dirname + '/../key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/../cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  const io = socketio(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on('connection', (socket) => {
    console.log('New Ws connection....');
    socket.on('send-message', async (text, currentRoom, who) => {
      const user = await room.findOne({ where: { id: currentRoom } });
      const saveMessage = await message.create({
        giver_id: user.dataValues.giver_id,
        helper_id: user.dataValues.helper_id,
        room_id: currentRoom,
        message: text,
        type: who,
        gifticon_id: 0,
      });
      io.emit('received-message', currentRoom);
    });
    socket.on('send-image', async (currentRoom) => {
      io.emit('received-message', currentRoom);
    });
  });
  server.listen(HTTPS_PORT, () =>
    console.log(`server runnning at port https://localhost:${HTTPS_PORT}`),
  );
} else {
  //http 서버;
  server = http.createServer(app);
  const io = socketio(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on('connection', (socket) => {
    console.log('New Ws connection....');
    socket.on('send-message', async (text, currentRoom, who) => {
      const user = await room.findOne({ where: { id: currentRoom } });
      const saveMessage = await message.create({
        giver_id: user.dataValues.giver_id,
        helper_id: user.dataValues.helper_id,
        room_id: currentRoom,
        message: text,
        type: who,
        gifticon_id: 0,
      });
      io.emit('received-message', currentRoom);
    });
    socket.on('send-image', async (currentRoom) => {
      io.emit('received-message', currentRoom);
    });
  });

  server.listen(HTTPS_PORT, () =>
    console.log(`Server running on port ${HTTPS_PORT}`),
  );
}

module.exports = server;
