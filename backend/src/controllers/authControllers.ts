import { Request, Response } from "express";
import { authservice } from "@/services/authService";
import httpStatus from "http-status";
import { User } from "@/protocols";

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const session = await authservice.signinService(email, password);
    return res
      .status(httpStatus.OK)
      .send({
        token: session.session.token,
        username: session.username,
        userId: session.session.userId,
      });
  } catch (error: any) {
    if (error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError")
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: "Email ou Senha Incorretos!" });
    if (error.name === "ConflictError")
      return res
        .status(httpStatus.CONFLICT)
        .send({ message: "usuário já logado no sistema" });
  }
};

const sendRegister = async (req: Request, res: Response) => {
  const { email, password, name, username } = req.body as User;

  const CreatedUser = {
    email,
    password,
    name,
    username,
  };

  try {
    await authservice.createdUserService(CreatedUser);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error: any) {
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
  }
};

const logout = async (req: Request, res: Response) => {
  const userId = req.userId as number;

  try {
    await authservice.logOutService(userId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
};

async function loginUsingGithub(req: Request, res: Response) {
  const code = req.body.code as string;
  try {
    const token = await authservice.exchangeCodeForAccessToken(code);
    const user = await authservice.fetchUser(token);
    return res.status(200).send(user);
  } catch (error: any) {
    console.log("err", error.response.data);
    res.sendStatus(500);
  }
}

export { sendRegister, signin, logout, loginUsingGithub };
