import { Request, Response } from "express";
import { bestsellerservice } from "@/services/bestsellersServices";
import httpStatus from "http-status";
import {  } from "@/protocols";

async function BestSellers(req: Request, res: Response) {
  try {
    const bestsellers = await bestsellerservice.BestSellersService()
    return res.status(httpStatus.OK).send(bestsellers);
  } catch (error) {
    res.send(error);
  }
};

export { BestSellers };
