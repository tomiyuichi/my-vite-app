const express = require('express');
const cors = require('cors'); // ミドルウェア設定
// const tableRoutes = require('./routes/tableRoutes');
const CSVUploaderRoutes = require('./routes/CSVUploaderRoutes');

const app = express();
const PORT = 3001;

// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // フロントエンドのURL
}));
app.use(express.json()); // JSONリクエストをパース

// ルートを登録
// app.use('/api/tables', tableRoutes);
app.use('/api/upload', CSVUploaderRoutes);

// サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
