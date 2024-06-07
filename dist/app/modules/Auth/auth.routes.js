"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("./auth.controllers");
const auth_1 = __importDefault(require("../../middelware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/login', auth_controllers_1.userLoginController);
router.post('/change-password', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), auth_controllers_1.changePasswordController);
exports.AuthRouters = router;
