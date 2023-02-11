import { Request, Response } from "express";
import { orderService } from "@/services/ordersService";
import { CreatedOrder } from "@/protocols"
import httpStatus from "http-status";

async function CreateOrders(req: Request, res: Response) {
  const userId = res.locals.userId as number;
  const { method, total } = req.body as Omit<CreatedOrder, "userId" | "num_order" | "date" | "status">

  try {
    const orders = await orderService.CreateOrder(+userId, method, +total);
    return res.status(httpStatus.CREATED).send(orders);
  } catch (error: any) {
    if (error === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

async function GetOrders(req: Request, res: Response) {
  const userId = res.locals.userId as number
  try {
    const orders = await orderService.GetOrderService(userId);
    return res.status(httpStatus.OK).send(orders);
  } catch (error: any) {
    if (error === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export { CreateOrders, GetOrders };
