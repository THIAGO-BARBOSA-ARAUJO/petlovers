"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signin = exports.sendRegister = void 0;
const authService_1 = require("@/services/authService");
const http_status_1 = __importDefault(require("http-status"));
const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const session = await authService_1.authservice.signinService(email, password);
        return res.status(http_status_1.default.OK).send({ token: session.token });
    }
    catch (error) {
        if (error.name === "NotFoundError")
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        if (error.name === "UnauthorizedError")
            return res.status(http_status_1.default.UNAUTHORIZED).send({ message: "Email ou Senha Incorretos!" });
        if (error.name === "ConflictError")
            return res
                .status(http_status_1.default.CONFLICT)
                .send({ message: "usuário já logado no sistema" });
    }
};
exports.signin = signin;
const sendRegister = async (req, res) => {
    const { email, password, name, username } = req.body;
    try {
        await authService_1.authservice.createdUserService(email, password, name, username);
        return res.sendStatus(http_status_1.default.CREATED);
    }
    catch (error) {
        if (error.name === "ConflictError") {
            return res.sendStatus(http_status_1.default.CONFLICT);
        }
    }
};
exports.sendRegister = sendRegister;
const logout = async (req, res) => {
    const authorization = req.headers.authorization;
    try {
        await authService_1.authservice.logOutService(authorization);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        if (error === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED);
        }
        if (error === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
    }
};
exports.logout = logout;
