import { Request, Response } from "express";
import { cartservice } from "@/services/cartService";
import httpStatus from "http-status";
import { CreatedCart, BodyAddCart } from "@/protocols"
import { number } from "joi";

const addToCart = async (req: Request, res: Response) => {
  const { name, img_url, price, quantity, stock } = req.body as BodyAddCart;

  const userId = req.userId as number;

  try {
    await cartservice.addCartService(
      userId,
      name,
      img_url,
      price,
      quantity,
      stock
    );
    return res.sendStatus(httpStatus.CREATED)
  } catch (error: any) {
      if (error.name === "BadRequestError") {
          return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
      }
  }
};

const getCart = async (req: Request, res: Response) => {
  const userId = req.userId as number;
  
  try {
    const resp = await cartservice.GetAllCart(userId)
    res.status(200).send(resp);
  } catch (error) {
    res.send(error);
  }
};


const deleteProductToCart = async (req: Request, res: Response) => {
  const userId = req.userId as number;
  const id = req.query.id as string;
  try {
    await cartservice.DeleteCartByProducId(userId, +id);
    res.sendStatus(200);
  } catch (error: any) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "BadRequestError") return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

const deleteCart = async (req: Request, res: Response) => {
  try {
    await cartservice.DeleteCartAll();
    res.sendStatus(200);
  } catch (error: any) {
    if (error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "BadRequestError")
      return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

const delAllCart = async (req: Request, res: Response) => {
  try {
    await cartservice.DeleteCartAll();
    return res.sendStatus(httpStatus.CREATED);
  } catch (error: any) {
    return res.send(error);
  }
};

const updateQuantityinCart = async (req: Request, res: Response) => {
  const userId = req.userId as number;
  const id = req.query.id as string;
  const method = req.body.method as string;
  try {
    await cartservice.updateQuantity(userId, +id, method);
    res.sendStatus(200);
  } catch (error: any) {
    if (error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "BadRequestError")
      return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};


export {
  addToCart,
  getCart,
  deleteProductToCart,
  updateQuantityinCart,
  deleteCart,
  delAllCart,
};
