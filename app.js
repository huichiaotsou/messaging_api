const express = require("express");
const { Client, middleware } = require("@line/bot-sdk");

const config = require("./config.json");

const app = express();
const client = new Client(config.line);

app.get('/webhook', (req, res) => {
  res.status(200).send('OK');
});

app.post('/webhook', middleware(config.line),(req, res) => {
  const events = req.body.events;
  events.forEach(event => {
      if (event.source.type === 'group') {
          const {groupId, userId, message} = event.source;
          console.log(`群組 ID: ${groupId}, 訊息為 ${message}`);
      }
  });
  res.status(200).send('OK');
});

// 啟動伺服器
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`server listeing on ${PORT}`);
});