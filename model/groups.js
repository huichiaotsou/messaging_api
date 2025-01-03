const dbConn = require("./database");

async function insertOrUpdateGroup(id, name) {
    try {
        // 插入資料，若主鍵衝突則更新
        await dbConn.runAsync(`
            INSERT INTO groups (line_group_id, name)
            VALUES (?, ?)
            ON CONFLICT(line_group_id) DO UPDATE SET name = excluded.name
        `, [id, name]);

        return { success: true, message: '資料插入或更新成功' }; // 返回成功訊息
    } catch (err) {
        return { success: false, message: '插入或更新資料失敗', error: err.message }; // 返回錯誤訊息
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
    insert: insertOrUpdateGroup,
    getAll: getAllGroups
};