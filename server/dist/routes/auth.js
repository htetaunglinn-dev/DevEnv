"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', validation_1.registerValidation, authController_1.register);
router.post('/login', validation_1.loginValidation, authController_1.login);
// Protected routes
router.get('/profile', auth_1.authenticateToken, authController_1.getProfile);
router.put('/profile', auth_1.authenticateToken, validation_1.updateProfileValidation, authController_1.updateProfile);
router.put('/change-password', auth_1.authenticateToken, validation_1.changePasswordValidation, authController_1.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map