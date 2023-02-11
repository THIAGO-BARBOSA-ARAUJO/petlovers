import express from "express";
import { getSerch } from "@/controllers/searchControllers";

const routerSearch = express.Router();

routerSearch.get("/", getSerch);

export { routerSearch };
