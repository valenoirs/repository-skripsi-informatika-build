"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config.js");
const PORT = process.env.PORT ?? '5000';
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/database';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'valenoirs';
const SESSION_COLLECTION_NAME = process.env.SESSION_COLLECTION_NAME ?? 'session';
const SESSION_LIFETIME = 1000 * 60 * 60 * 24;
const config = {
    PORT,
    MONGO_URI,
    SESSION_SECRET,
    SESSION_COLLECTION_NAME,
    SESSION_LIFETIME,
};
exports.default = config;
