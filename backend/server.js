const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const mysql = require("mysql2/promise");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "upload/" });

const cors = require("cors"); // 追加
app.use(cors({
  origin: "http://localhost:5173", // フロントエンドのURL
}));

const dbConfig = {
  host: "localhost",
  user: "myviteapp_user",
  password: "myviteapp_user",
  database: "myviteapp",
};

// カラム情報を取得する関数
async function getColumnInfo(tableName) {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(`
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?;
  `, [dbConfig.database, tableName]);
  await connection.end();
  return rows;
}

// バリデーション関数を生成
function createValidator(columns) {
  return (row) => {
    return columns.every((col) => {
      const value = row[col.COLUMN_NAME];
      if (col.IS_NULLABLE === "NO" && (value === undefined || value === null || value === "")) {
        return false; // 必須項目が空の場合
      }
      if (col.DATA_TYPE === "int" && value !== undefined && isNaN(Number(value))) {
        return false; // int型の検証
      }
      if (col.DATA_TYPE === "varchar" && value !== undefined && typeof value !== "string") {
        return false; // varchar型の検証
      }
      if (col.DATA_TYPE === "double" && value !== undefined && isNaN(Number(value))) {
        return false; // double型の検証
      }
      // 必要に応じて他の型を追加（例: DATE, BOOLEANなど）
      return true;
    });
  };
}


app.post("/upload", upload.single("csv"), async (req, res) => {
  const results = [];
  const invalidRows = [];
  const filePath = req.file.path;

  // テーブルのカラム情報を取得
  const columns = await getColumnInfo("autoMpgs");
  const validateRow = createValidator(columns); // バリデーション関数を作成
  console.log("debug_p1");

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      if (validateRow(data)) {
        results.push(data); // 有効なデータ
      } else {
        invalidRows.push(data); // 無効なデータ
      }
    })
    .on("end", () => {
      // 有効なデータをデータベースに挿入
      results.forEach((row) => {
        const query = `
          INSERT INTO autoMpgs (displacement, mpg, cylinders, horsepower, weight, acceleration, model_year, origin, car_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const { displacement, mpg, cylinders, horsepower, weight, acceleration, model_year, origin, car_name } = row;
        dbConfig.query(query, [displacement, mpg, cylinders, horsepower, weight, acceleration, model_year, origin, car_name], (err) => {
          if (err) console.error(err);
        });
      });

      // CSVファイルを削除
      fs.unlinkSync(filePath);

      res.json({
        message: "CSV data imported successfully!",
        processedRows: results.length,
        skippedRows: invalidRows.length,
      });
    });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});