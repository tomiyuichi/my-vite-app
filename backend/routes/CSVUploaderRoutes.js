const express = require('express');
const multer = require('multer');
const path = require('path');
const { CSVUploader } = require('../controllers/CSVUploaderController');

const router = express.Router();

// アップロード先フォルダを指定
const upload = multer({
    dest: path.join(__dirname, '../uploads'), // アップロード先のフォルダ
    limits: { fileSize: 5 * 1024 * 1024 }, // ファイルサイズ制限（5MB）
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv') {
            cb(null, true); // CSVファイルのみ許可
        } else {
            cb(new Error('Only CSV files are allowed'), false);
        }
    },
});


router.post('/', CSVUploader);

module.exports = router;