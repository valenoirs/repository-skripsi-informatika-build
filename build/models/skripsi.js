"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skripsi = void 0;
const mongoose_1 = require("mongoose");
const SkripsiSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    abstract: { type: String, required: true },
    keyword: { type: String, required: true },
    year: { type: String, required: true },
    uri: { type: String, required: true },
    admin: { type: String, required: true },
    pembimbingI: { type: String, required: true },
    pembimbingII: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Skripsi = (0, mongoose_1.model)('Skripsi', SkripsiSchema);
