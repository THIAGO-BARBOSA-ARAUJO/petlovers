import express from "express";
import {
  addToCart,
  getCart,
  deleteProductToCart,
  updateQuantityinCart,
  deleteCart,
  delAllCart,
} from "@/controllers/cartControllers";
import { authenticateToken } from "@/middlewares/autentication-middleware";
import { validAddCart } from "@/middlewares/validCartMiddleware";

const routerCart = express.Router();

routerCart.post("/", authenticateToken, validAddCart, addToCart);
routerCart.get("/", authenticateToken, getCart);
routerCart.delete("/", authenticateToken, deleteProductToCart);
routerCart.delete("/deletecart", authenticateToken, deleteCart);
routerCart.delete("/delallcart", authenticateToken, delAllCart);
routerCart.patch("/", authenticateToken, updateQuantityinCart);

export { routerCart };
