"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middelware/globalErrorHandler");
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "https://travel-buddy-beta.vercel.app/",
    ],
    credentials: true,
}));
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Travel Buddy Matching App'
    });
});
app.use('/api/v1/', routes_1.default);
app.use('*', (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'API not found!',
        errorDetails: {
            path: req.originalUrl,
            message: 'Your request path is not found!'
        }
    });
    next();
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
