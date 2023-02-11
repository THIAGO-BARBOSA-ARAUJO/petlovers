"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
//import router from "@/routes/router"
const routes_1 = require("@/routes");
//import routerDogs from "./routes/dogs.js"
//import routerCart from "./routes/cartRoute.js";
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
//server.use(router)
server.use(routes_1.routerAuth);
//server.use(routerDogs)
//server.use(routerCart)
server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
