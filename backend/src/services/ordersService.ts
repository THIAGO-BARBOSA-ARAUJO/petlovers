import { badRequestError, unauthorizedError, notFoundError } from "@/errors";
import { OrdersRepository } from "@/repositories/ordersRepository";
import dayjs from "dayjs"

async function CreateOrder(userId: number, method: string, total: number) {
  if (!method || !total) throw badRequestError();

    const dataOrder = {
      userId,
      date: String(dayjs().format(`${dayjs().date()}/MM/YYYY HH:mm:ss`)),
      method,
      total,
      status: "Pendente",
    };
    
  return OrdersRepository.CreateOrder(dataOrder);
}

async function GetOrderService(userId: number) {
    if(!userId) throw unauthorizedError()

    const orders = OrdersRepository.FindOrders(userId);
    if (!orders) throw notFoundError()
    return orders
}

export const orderService = {
  CreateOrder,
  GetOrderService,
};
