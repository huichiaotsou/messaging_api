const express = require("express");
require("./model/database");
const { Client, middleware } = require("@line/bot-sdk");
const config = require("./config.json");
const app = express();
const client = new Client(config.line);
const {recordGroupID, getAllGroups} = require("./controller/groups");

// 啟動伺服器
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`server listeing on ${PORT}`);
});

// LINE Webhook, for registering Group ID
app.get('/webhook', (req, res) => {
  res.status(200).send('OK');
});

app.post('/webhook', middleware(config.line), async (req, res) => {
  try {
    await recordGroupID(req.body.events[0])
    res.status(200).send('OK');
  } catch(err) {
    console.error(err)
  }
});


app.get('/groups', async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.status(200).send(groups);
  } catch(err) {
    console.error(err)
  }
});
