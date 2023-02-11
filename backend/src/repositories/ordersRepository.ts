import prisma from "@/config/database";
import { orders } from "@prisma/client";

async function CreateOrder(dataorders: Omit<orders, "id" | "num_order">) {
  return prisma.orders.create({
    data: dataorders,
  });
}

async function FindOrders(userId: number) {
  return prisma.orders.findMany({
    where: {
      userId
    },
  });
}

export const OrdersRepository = {
  CreateOrder,
  FindOrders,
};
