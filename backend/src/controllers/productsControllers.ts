import { Request, Response } from "express";
import { animalservice } from "@/services/productsService";
import httpStatus from "http-status";

async function getcategory(req: Request, res: Response) {
  const animal = req.params.animal as string;
  try {
    const dog = await animalservice.categoryService(animal);

    return res.status(httpStatus.OK).send(dog);
  } catch (error: any) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.name });
  }
}

export { getcategory };
