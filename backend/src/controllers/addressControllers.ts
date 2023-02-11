import { Request, Response } from "express";
import { addressService } from "@/services/addressServices";
import httpStatus from "http-status";
import { address } from "@prisma/client";
import { number } from "joi";

async function GetAddress(req: Request, res: Response) {
  const userId = res.locals.userId as number;

  try {
    const address = await addressService.FindAddressService(userId);
    return res.status(200).send(address);
  } catch (error: any) {
    if (error.name === "NotFoundError") return httpStatus.NOT_FOUND;
  }
}

async function CreateAddress(req: Request, res: Response) {
  const userId = res.locals.userId as number
  const { street, num, district, complement, city, state } = req.body as bodyAddress;
  const number = +num as number
  const dataAddress = {
    street,
    userId,
    number,
    district,
    complement,
    city,
    state,
  };
  try {
    const resp = await addressService.CreateAddressService(dataAddress);
    return res.status(200).send(resp);
  } catch (error: any) {
    if (error.name === "BadRequestError") return httpStatus.BAD_REQUEST;
  }
}

async function DeletedAddress(req: Request, res: Response) {
  const ids = req.query.id ;
  const id = Number(ids)
  const userId = res.locals.userId as number

  try {
    const resp = await addressService.DeletedAddressService(id, userId);
    return res.status(200).send(resp);
  } catch (error: any) {
    if (error.name === "BadRequestError") return httpStatus.BAD_REQUEST;
  }
}

async function GetCep(req: Request, res: Response) {
  const cep = req.query.cep as string

  try {
    const resp = await addressService.GetCepService(cep)
    return res.status(200).send(resp.data);
  } catch (error: any) {
    if (error.name === "BadRequestError") return httpStatus.BAD_REQUEST;
    if (error.name === "NotFoundError") return httpStatus.NOT_FOUND;
  }
}

type bodyAddress = {
  street: string;
  userId: number;
  num: number;
  district: string;
  complement: string | null;
  city: string;
  state: string;
};

export { GetAddress, CreateAddress, DeletedAddress, GetCep };
