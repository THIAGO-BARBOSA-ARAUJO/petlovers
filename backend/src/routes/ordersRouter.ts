import express from "express";
import { CreateOrders, GetOrders } from "@/controllers/ordersControllers";
import { authenticateToken } from "@/middlewares/autentication-middleware";

const routerOrders = express.Router();

routerOrders.post("/", authenticateToken, CreateOrders);
routerOrders.get("/", authenticateToken, GetOrders);

export { routerOrders };
