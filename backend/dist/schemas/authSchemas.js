"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaRegister = exports.schemaLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const schemaLogin = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .empty()
        .required(),
    password: joi_1.default.string()
        .empty()
        .required()
}).options({ abortEarly: false });
exports.schemaLogin = schemaLogin;
const schemaRegister = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .empty()
        .required(),
    password: joi_1.default.string()
        .alphanum()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .empty()
        .required(),
    name: joi_1.default.string()
        .required(),
    username: joi_1.default.string()
        .required()
        .empty()
}).options({ abortEarly: false });
exports.schemaRegister = schemaRegister;
