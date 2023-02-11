import * as core from "express-serve-static-core";

export type User = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type BodyAddCart = Omit<CreatedCart, "userId">;

export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};


export type CreatedCart = {
  userId: number;
  name: string;
  img_url: string;
  price: number;
  stock: number;
  quantity: number;
};

export type CreatedOrder = {
  userId: number;
  num_order: number;
  date: string;
  method: string;
  total: number;
  status: string;
};