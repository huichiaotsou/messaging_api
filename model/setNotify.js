const dbConn = require("./database");

async function insertSchedule(id, name) {
    try {
        await dbConn.runAsync('INSERT INTO schedules (group_id, dates) VALUES (?, ?)', [id, name]);
    } catch (err) {
        console.error('插入資料失敗：', err.message);
    }
};

module.exports = { insert: insertSchedule };