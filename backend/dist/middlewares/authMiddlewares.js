"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validRegister = exports.validLogin = void 0;
const authSchemas_1 = require("@/schemas/authSchemas");
const http_status_1 = __importDefault(require("http-status"));
function validLogin(req, res, next) {
    const { email, password } = req.body;
    const validador = authSchemas_1.schemaLogin.validate({ email, password });
    if (validador.error) {
        console.log(validador.error);
        return res.sendStatus(422);
    }
    next();
}
exports.validLogin = validLogin;
function validRegister(req, res, next) {
    const { email, password, name, username } = req.body;
    const validador = authSchemas_1.schemaRegister.validate({
        email,
        password,
        name,
        username,
    });
    if (validador.error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    next();
}
exports.validRegister = validRegister;
