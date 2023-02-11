import express from "express";
import {
  GetAddress,
  CreateAddress,
  DeletedAddress,
  GetCep,
} from "@/controllers/addressControllers";
import { authenticateToken } from "@/middlewares/autentication-middleware";

const routerAddress = express.Router();

routerAddress.get("/", authenticateToken, GetAddress);
routerAddress.get("/getcep", GetCep);
routerAddress.post("/", authenticateToken, CreateAddress);
routerAddress.delete("/", authenticateToken, DeletedAddress);

export { routerAddress };
