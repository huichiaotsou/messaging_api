const axios = require('axios');
const lineConfig = require("../config.json").line;

async function sendToGroup(groupID, message) {
    const API_URL = 'https://api.line.me/v2/bot/message/push';

    // 設定請求的標頭與資料
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lineConfig.channelAccessToken}`,
    };

    const data = {
        to: groupID,
        messages: [
            {
                type: 'text',
                text: message,
            },
        ],
    };

    try {
        // 發送 POST 請求
        const response = await axios.post(API_URL, data, { headers });
        console.log('訊息發送成功:', response.data);
    } catch (error) {
        console.error('發送訊息失敗:', error.response?.data || error.message);
    }
}

module.exports = sendToGroup;