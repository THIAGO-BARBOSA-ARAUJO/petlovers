import express from "express";
import { BestSellers } from "@/controllers/bestsellersControllers";

const routerBestsellers = express.Router();

routerBestsellers.get("/bestsellers", BestSellers);

export { routerBestsellers }
