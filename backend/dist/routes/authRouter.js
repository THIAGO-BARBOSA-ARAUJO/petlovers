"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("@/controllers/authControllers");
const authMiddlewares_1 = require("@/middlewares/authMiddlewares");
const autentication_middleware_1 = require("@/middlewares/autentication-middleware");
const routerAuth = express_1.default.Router();
exports.routerAuth = routerAuth;
routerAuth.post("/login", authMiddlewares_1.validLogin, authControllers_1.signin);
routerAuth.delete("/logout", autentication_middleware_1.authenticateToken, authControllers_1.logout);
routerAuth.post("/register", authMiddlewares_1.validRegister, authControllers_1.sendRegister);
