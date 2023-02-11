import { Request, Response } from "express";
import { userservice } from "@/services/userService";
import httpStatus from "http-status";

async function getUser(req: Request, res: Response) {
  
    const userId = res.locals.userId as number ;

  try {
    const user = await userservice.UserService(userId);

    return res.status(httpStatus.OK).send([{email: user.email, name:user.name}]);
  } catch (error: any) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.name });
  }
}



export { getUser };
