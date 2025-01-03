const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

// 創建或連接資料庫檔案
const db = new sqlite3.Database('./thehopebot.db', (err) => {
    if (err) {
        console.error('資料庫連接失敗：', err.message);
    } else {
        console.log('成功連接 SQLite 資料庫。');
    }
});

// Create groups table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自動遞增的整數主鍵
            ling_group_id TEXT NOT NULL UNIQUE,   -- 唯一且不能為空
            name TEXT NOT NULL                    -- 群組名稱
        );
    `, (err) => {
        if (err) {
            console.error('groups 表格創建失敗：', err.message);
        } else {
            console.log('groups 表格創建成功！');
        }
    });
});

// 封裝成 async/await
const DB = {
    runAsync : promisify(db.run.bind(db)), // no result return
    getAsync : promisify(db.get.bind(db)), // get 1 row
    allAsync : promisify(db.all.bind(db)), // get several rows
}

module.exports = DB;
