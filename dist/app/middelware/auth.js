"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const ApiErrors_1 = require("../errors/ApiErrors");
const http_status_1 = __importDefault(require("http-status"));
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            let token;
            if ((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.includes('Bearer')) {
                token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
            }
            else {
                token = req.headers.authorization;
            }
            if (!token) {
                throw new ApiErrors_1.ApiErrors(false, http_status_1.default.UNAUTHORIZED, 'Your are not authorizaed!');
            }
            ;
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.jwt_secret);
            if (!decoded) {
                throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, 'FORBIDDEN!');
            }
            ;
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, 'FORBIDDEN!');
            }
            ;
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
