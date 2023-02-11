import prisma from "@/config/database";
import { cart } from "@prisma/client";
import { CreatedCart } from "@/protocols"

async function addCartRepository(cratedCart: CreatedCart): Promise<cart> {
  return prisma.cart.create({
    data: cratedCart,
  });
}

async function GetCartRepository(userId: number): Promise<cart[]> {
  return prisma.cart.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
  });
}

async function GetProductCartById(id: number) {
  return prisma.cart.findFirst({
    where: {
      id
    }
  });
}

async function GetProductCartByImgUrl(img_url: string) {
  return prisma.cart.findFirst({
    where: {
      img_url,
    },
  });
}

async function DeleteCartRepository(id: number) {
  return prisma.cart.delete({
    where: {
      id,
    },
  });
}

async function UpdateCartById(id: number, quantity: number) {
  return prisma.cart.update({
    where: {
      id,
    },
    data: {
      quantity,
    },
  });
}

async function DeleteCart() {
  return prisma.cart.deleteMany();
}

export const cartrepository = {
  addCartRepository,
  GetCartRepository,
  DeleteCartRepository,
  GetProductCartById,
  UpdateCartById,
  GetProductCartByImgUrl,
  DeleteCart,
};
