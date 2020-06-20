const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mutate = require('./mutate');

const app = express();
app.use(bodyParser.json());

app.post('/mutate', mutate)

const key = fs.readFileSync('webhook.key').toString();
const cert = fs.readFileSync('webhook.crt').toString();

const server = https.createServer({
  key,
  cert
}, app);

const port = process.env.PORT
const hostname = process.env.HOST_NAME
server.listen(port, hostname, () => {
  console.log(`Server running at https://${port}:${hostname}/`);
});