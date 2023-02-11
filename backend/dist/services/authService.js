"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authservice = void 0;
const errors_1 = require("@/errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authRepository_1 = require("@/repositories/authRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createdUserService(email, passwordrow, name, username) {
    const getUser = await authRepository_1.authrepository.GetUsersByEmail(email);
    if (getUser)
        throw (0, errors_1.conflictError)("já existe um usuário com esse email");
    const password = bcrypt_1.default.hashSync(passwordrow, 10);
    const createdUser = {
        email,
        password,
        name,
        username,
    };
    return await authRepository_1.authrepository.CreatedUser(createdUser);
}
async function signinService(email, password) {
    const user = await authRepository_1.authrepository.GetUsersByEmail(email);
    if (!user) {
        throw (0, errors_1.notFoundError)();
    }
    // const userjalogado = await authrepository.GetSeesionByUserId(user.id);
    // if (userjalogado) throw conflictError("usuário já logado no sistema");
    const senhaEvalida = bcrypt_1.default.compareSync(password, user.password);
    if (email === user.email && senhaEvalida) {
        const payload = { userId: user.id };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 300, // expires in 5min
        });
        const cretedSession = {
            userId: user.id,
            token: token,
        };
        const session = await authRepository_1.authrepository.CreateSession(cretedSession);
        return session;
    }
    else {
        throw (0, errors_1.unauthorizedError)();
    }
}
async function logOutService(authorization) {
    if (!authorization)
        throw (0, errors_1.unauthorizedError)();
    const token = authorization.replace("Bearer ", "");
    if (!token)
        throw (0, errors_1.unauthorizedError)();
    const session = await authRepository_1.authrepository.GetSeesionByToken(token);
    if (!session)
        throw (0, errors_1.notFoundError)();
    return await authRepository_1.authrepository.DeleteSessionByUserId(session.userId);
}
exports.authservice = {
    createdUserService,
    signinService,
    logOutService,
};
