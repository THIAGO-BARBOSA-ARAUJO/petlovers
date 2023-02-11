import { Request, Response } from "express";
import { SearchService } from "@/services/searchService";
import httpStatus from "http-status";

const getSerch = async (req: Request, res: Response) => {
  const search = req.query.search as string;

  try {
    const resp = await SearchService.GetSearch(search);
    return res.status(httpStatus.OK).send(resp);
  } catch (error) {
    if (error === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
};

export { getSerch };
