"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authrepository = void 0;
const database_1 = __importDefault(require("@/config/database"));
async function CreatedUser(createUser) {
    return database_1.default.users.create({
        data: createUser,
    });
}
async function GetUsersByEmail(email) {
    return database_1.default.users.findFirst({
        where: {
            email,
        },
    });
}
async function CreateSession(createSession) {
    return database_1.default.sessions.create({
        data: createSession
    });
}
async function GetSeesionByUserId(userId) {
    return database_1.default.sessions.findFirst({
        where: {
            userId
        }
    });
}
async function GetSeesionByToken(token) {
    return database_1.default.sessions.findFirst({
        where: {
            token,
        },
    });
}
async function DeleteSessionByUserId(userId) {
    return database_1.default.sessions.deleteMany({
        where: {
            userId,
        },
    });
}
exports.authrepository = {
    CreatedUser,
    GetUsersByEmail,
    CreateSession,
    GetSeesionByUserId,
    GetSeesionByToken,
    DeleteSessionByUserId,
};
