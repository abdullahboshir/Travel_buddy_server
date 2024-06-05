"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const traveler_controllers_1 = require("./traveler.controllers");
const router = express_1.default.Router();
router.post('/register', traveler_controllers_1.createTravelerController);
exports.TravelerRoutes = router;
