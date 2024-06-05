"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const auth_1 = __importDefault(require("../../middelware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/getUsers', user_controllers_1.getUsersController);
router.get('/profile', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), user_controllers_1.getTravelerProfileController);
router.put('/update/:id', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), user_controllers_1.updateUserController);
router.put('/admin/update/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controllers_1.updateUserController);
exports.userRoutes = router;
