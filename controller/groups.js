const Groups = require("../model/groups");
const sendToGroup = require("../utils/line");

async function recordGroupID(event) {    
    const { groupId } = event.source;
    const message = event.message.text
    
    if (event.source.type !== 'group') {
        // 若非群組訊息則跳過
        return;
    }
    if (!message.includes("我要記錄群組 ID, 這個群組的名稱是: ")) {
        // 如果回覆的訊息沒有「記錄群組ID」跳過
        return;
    }

    // Store LINE Group ID & Group Name
    const groupName = message.split("這個群組的名稱是: ")[1];
    const result = await Groups.insert(groupId, groupName);
    if (!result.success){
        await sendToGroup(groupId, "群組記錄失敗，請洽管理員");
        throw new Error(`fail to record group, id: ${groupId}, error message: ${result.error}`)
    }

    await sendToGroup(groupId, "群組已記錄，可以開始使用 The Hope Notify 囉！");
    console.log(`群組 ID: ${groupId}, 訊息為: ${message.text}, timestamp: ${event.timestamp}`);

    const res = await Groups.getAll();
    console.log("all groups: ", res);
    return;
};

module.exports = recordGroupID;