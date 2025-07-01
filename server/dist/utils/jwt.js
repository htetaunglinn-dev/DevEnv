"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key";
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key";
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
};
exports.verifyToken = verifyToken;
const generateRefreshToken = (payload) => {
    const secret = process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "30d";
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    const secret = process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map