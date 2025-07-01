"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticateToken = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            res.status(401).json({ message: 'Access token required' });
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = await User_1.default.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ message: 'Invalid token - user not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const decoded = (0, jwt_1.verifyToken)(token);
            const user = await User_1.default.findById(decoded.userId);
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        // Continue without authentication if token is invalid
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map