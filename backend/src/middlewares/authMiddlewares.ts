import { schemaLogin, schemaRegister } from "@/schemas/authSchemas";
import { Request, Response, NextFunction } from "express";
import { User } from "../protocols";
import httpStatus from "http-status";

function validLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as Login;

  const validador = schemaLogin.validate({ email, password });

  if (validador.error) {
    console.log(validador.error);
    return res.sendStatus(422);
  }
  next();
}

function validRegister(req: Request, res: Response, next: NextFunction) {
  const { email, password, name, username } = req.body as User;

  const validador = schemaRegister.validate({
    email,
    password,
    name,
    username,
  });

  if (validador.error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  next();
}

// const middlewareValidarJWT = (req: Request, res: Response, next: NextFunction) => {
//   const jwt = req.headers.authorization as string;

//   const jwtService = require("jsonwebtoken");
//   jwtService.verify(jwt, process.env.JWT_SECRET, (err: any, userInfo: any) => {
//     if (err) {
//       return res.status(httpStatus.UNAUTHORIZED).send({erro: err.name});
//     }
//     next();
//   });
// };

type Login = Pick<User, "email" | "password">;

export { validLogin, validRegister };
