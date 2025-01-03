const dbConn = require("./database");

async function insertGroup(id, name) {
    try {
        await dbConn.runAsync('INSERT INTO groups (id, name) VALUES (?, ?)', [id, name]);
        return { success: true, message: '資料插入成功' }; // 回傳成功訊息
    } catch (err) {
        return { success: false, message: '插入資料失敗', error: err.message }; // 回傳錯誤訊息
    }
}

async function getAllGroups() {
    try {
        const groups = await dbConn.allAsync('SELECT * FROM groups'); // 查詢所有資料
        return { success: true, data: groups }; // 返回成功結果和資料
    } catch (err) {
        return { success: false, message: '查詢資料失敗', error: err.message }; // 返回錯誤資訊
    }
}

module.exports = { 
    insert: insertGroup,
    getAll: getAllGroups
};