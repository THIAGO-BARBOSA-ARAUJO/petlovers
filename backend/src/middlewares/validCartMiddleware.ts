import { schemaAddCart } from "@/schemas/cartSchema";
import { Request, Response, NextFunction } from "express";
import { BodyAddCart } from "@/protocols";

function validAddCart(req: Request, res: Response, next: NextFunction) {
  const { name, img_url, price, quantity, stock } = req.body as BodyAddCart;

  const validador = schemaAddCart.validate({
    name,
    img_url,
    price,
    quantity,
    stock,
  });

  if (validador.error) {
    console.log(validador.error);
    return res.sendStatus(422);
  }
  next();
}

export { validAddCart };
