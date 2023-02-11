import { badRequestError, notFoundError } from "@/errors";
import { cartrepository } from "@/repositories/cartRepository";

async function addCartService(
  userId: number,
  name: string,
  img_url: string,
  price: number,
  quantity: number,
  stock: number
) {
  if (!userId || !name || !img_url || !price || !quantity || !stock)
    throw badRequestError();

  const productcart = await cartrepository.GetProductCartByImgUrl(img_url);

  if (productcart) {
    const quantity = productcart.quantity + 1;
    return await cartrepository.UpdateCartById(productcart.id, quantity);
  }

  const CreatedCart = {
    userId,
    name,
    img_url,
    price,
    quantity,
    stock,
  };

  const cart = await cartrepository.addCartRepository(CreatedCart);

  return cart;
}

async function GetAllCart(userId: number) {
  const cart = await cartrepository.GetCartRepository(userId);
  return cart;
}

async function DeleteCartByProducId(userId: number, id: number) {
  if (!id) throw badRequestError();

  const productCart = await cartrepository.GetProductCartById(id);

  if (!productCart) throw notFoundError();

  if (userId === productCart.userId)
    return await cartrepository.DeleteCartRepository(id);
}

async function DeleteCartAll() {
  return await cartrepository.DeleteCart();
}

async function updateQuantity(userId: number, id: number, method: string) {
  if (!id) throw badRequestError();
  if (!method) throw badRequestError();

  const productCart = await cartrepository.GetProductCartById(id);

  if (!productCart) throw notFoundError();

  if (method === "add") {
    if (userId === productCart.userId) {
      const quantity = productCart.quantity + 1;
      await cartrepository.UpdateCartById(productCart.id, quantity);
      if (productCart.quantity < 1) {
        return cartrepository.DeleteCartRepository(productCart.id);
      }
      return
    }
  }

  if (method === "remove") {
    if (userId === productCart.userId) {
      const quantity = productCart.quantity - 1;
      await cartrepository.UpdateCartById(productCart.id, quantity);
    }
    const productCart2 = await cartrepository.GetProductCartById(id);
    if (productCart2 === null || productCart2.quantity < 1) {
      return cartrepository.DeleteCartRepository(productCart.id);
    }
    return;
  }

  throw badRequestError();
}

export const cartservice = {
  addCartService,
  GetAllCart,
  DeleteCartByProducId,
  updateQuantity,
  DeleteCartAll,
};
