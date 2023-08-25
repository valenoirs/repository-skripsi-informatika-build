"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fs_1 = require("fs");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        const dir = path_1.default.join(__dirname, '../public/upload/skripsi');
        try {
            (0, fs_1.mkdirSync)(dir);
        }
        catch (error) {
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const multerOption = {
    fileFilter: function (req, file, callback) {
        const ext = path_1.default.extname(file.originalname);
        if (ext === '.pdf') {
            callback(null, true);
        }
        return callback(null, false);
    },
    storage,
    limit: { fileSize: MAX_FILE_SIZE }
};
exports.upload = (0, multer_1.default)(multerOption);
