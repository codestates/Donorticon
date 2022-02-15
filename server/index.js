require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./router');
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: clientUrl,
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
  const privateKey = fs.readFileSync(__dirname + '/../key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/../cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log(`server runnning at port ${HTTPS_PORT}`),
  );
} else {
  server = app.listen(HTTPS_PORT);
}
module.exports = server;
