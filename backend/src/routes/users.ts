import express from "express";
import { getUser } from "@/controllers/userControler";
import { authenticateToken } from "@/middlewares/autentication-middleware";
const routerUsers = express.Router();

routerUsers.get("/", authenticateToken, getUser);

export { routerUsers };
