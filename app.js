const express = require("express");
require("./model/database");
const { Client, middleware } = require("@line/bot-sdk");
const config = require("./config.json");
const app = express();
const client = new Client(config.line);
const recordGroupID = require("./controller/groups");


app.get('/webhook', (req, res) => {
  res.status(200).send('OK');
});


// LINE Webhook, for registering Group ID
app.post('/webhook', middleware(config.line), async (req, res) => {
  try {
    await recordGroupID(req.body.events)
    res.status(200).send('OK');
  } catch(err) {
    console.error(err)
  }
});

// 啟動伺服器
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`server listeing on ${PORT}`);
});