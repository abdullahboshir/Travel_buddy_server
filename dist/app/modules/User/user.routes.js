"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const router = express_1.default.Router();
router.post('/register', user_controllers_1.createUserController);
router.get('/profile', user_controllers_1.getUserProfileController);
router.put('/profile', user_controllers_1.updateUserController);
exports.UserRouters = router;
