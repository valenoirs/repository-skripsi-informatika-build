"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    nim: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isDosen: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
