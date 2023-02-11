import express from "express"

import { getcategory } from "@/controllers/productsControllers";

const routerProducts = express.Router()

routerProducts.get("/:animal", getcategory);

export { routerProducts };