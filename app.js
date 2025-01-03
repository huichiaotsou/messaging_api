const express = require("express");
const { Client, middleware } = require("@line/bot-sdk");

const config = require("./config.json");

const app = express();
const client = new Client(config.line);


app.post('/webhook', middleware(config.line),(req, res) => {
  const events = req.body.events;
  events.forEach(event => {
      if (event.source.type === 'group') {
          const groupId = event.source.groupId;
          console.log(`群組 ID: ${groupId}`);
      }
  });
  res.status(200).send('OK');
});


// // 儲存群組 ID 的資料
// let groupIds = [];

// // 處理各類事件
// async function handleEvent(event) {
//   if (event.type === "join") {
//     // 機器人被加入群組事件
//     if (event.source.type === "group") {
//       const groupId = event.source.groupId;
//       if (!groupIds.includes(groupId)) {
//         groupIds.push(groupId);
//       }
//     }
//   }

//   if (event.type === "message" && event.message.type === "text") {
//     const message = event.message.text;

//     // 如果收到特定指令，列出所有群組 ID
//     if (message === "查詢群組 ID") {
//       return client.replyMessage(event.replyToken, {
//         type: "text",
//         text: `目前群組 ID:\n${groupIds.join("\n")}`,
//       });
//     }
//   }

//   return Promise.resolve(null);
// }

// // 對特定群組發送訊息
// app.get("/send-message", async (req, res) => {
//   const { groupId, message } = req.query;

//   if (!groupIds.includes(groupId)) {
//     return res.status(400).send("群組 ID 不存在");
//   }

//   try {
//     await client.pushMessage(groupId, { type: "text", text: message });
//     res.send("訊息已發送");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("發送失敗");
//   }
// });

// 啟動伺服器
const PORT = config.server.port || 3000;
app.listen(PORT, () => {
  console.log(`server listeing on ${PORT}`);
});