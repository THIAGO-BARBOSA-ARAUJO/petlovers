import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { routerAuth, routerBestsellers, routerProducts, routerCart, routerUsers, routerAddress, routerOrders, routerSearch } from "@/routes";

dotenv.config()

const server = express()

server.use(cors())
server.use(express.json())
server.use(routerBestsellers)
server.use(routerAuth)
server.use("/products", routerProducts)
server.use("/cart", routerCart)
server.use("/user", routerUsers);
server.use("/address", routerAddress);
server.use("/orders", routerOrders);
server.use("/search", routerSearch);

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))