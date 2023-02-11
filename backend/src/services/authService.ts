import {} from "@prisma/client";
import { notFoundError, conflictError, unauthorizedError, badRequestError } from "@/errors";
import bcrypt from "bcrypt";
import { authrepository } from "@/repositories/authRepository";
import jwt from "jsonwebtoken";
import axios from "axios"
import { users } from "@prisma/client";

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
  await authrepository.CreateSession({
    token,
    userId,
  });

  return token;
}

async function createdUserService(
  CreateUser: Omit<users, "id">
) {
  const getUser = await authrepository.GetUsersByEmail(CreateUser.email);

  if (getUser) throw conflictError("já existe um usuário com esse email");

  const password = bcrypt.hashSync(CreateUser.password, 10);
  const createdUser = {
    email: CreateUser.email,
    password: password,
    name: CreateUser.name,
    username: CreateUser.username,
  };

  return await authrepository.CreatedUser(createdUser);
}

async function signinService(email: string, password: string) {
  const user = await authrepository.GetUsersByEmail(email);
  if (!user) {
    throw notFoundError();
  }

  // const userjalogado = await authrepository.GetSeesionByUserId(user.id);
  // if (userjalogado) throw conflictError("usuário já logado no sistema");

  const senhaEvalida = bcrypt.compareSync(password, user.password);

  if (email === user.email && senhaEvalida) {
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: 86400, // expires in 5min | 86400 - expires in 1 day
    });

    const cretedSession = {
      userId: user.id,
      token: token,
    };
    const session = await authrepository.CreateSession(cretedSession);
    const resp = {
      session,
      username: user.username
    };
    return resp;
  } else {
    throw unauthorizedError();
  }
}

async function logOutService(userId: number) {

  if (!userId) throw badRequestError()
  
  return await authrepository.DeleteSessionByUserId(userId);
}

async function exchangeCodeForAccessToken(code: string) {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
  const {
    REACT_APP_REDIRECT_URL,
    REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET,
  } = process.env;
  const body = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REACT_APP_REDIRECT_URL,
    client_id: REACT_APP_CLIENT_ID,
    client_secret: REACT_APP_CLIENT_SECRET,
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const myArray = data.split("&");
  const accessToken = myArray[0];
  const access_token = accessToken.split("=");
  const accessTokenParsed = access_token[1];
  return accessTokenParsed;
}

async function fetchUser(token: string | string[]) {
  try {
    const response = await axios.get("http://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const existUser = await authrepository.GetUsersByEmail(
      `${response.data.id}-github@drivent.com`
    );

    if (existUser) {
      const userToken = await createSession(existUser.id);

      const userData = {
        user: {
          id: existUser.id,
          username: existUser.username,
        },
        token: userToken,
      };

      return userData;
    }

    const createUserGitHub: CreateUserParams = {
      name: `${response.data.name}`,
      username: `${response.data.login}`,
      email: `${response.data.id}-github@drivent.com`,
      password: `${response.data.id}-${process.env.PASSWORD_TOKEN_GITHUB}`,
    };

    const user = await createdUserService(createUserGitHub);

    const userToken = await createSession(user.id);
    const userData = {
      user: {
        id: user.id,
        username: user.name,
      },
      token: userToken,
    };
    return userData;
  } catch (error: any) {
    console.error(error.message);
  }
}

export type CreateUserParams = Omit<users, "id">;

export const authservice = {
  createdUserService,
  signinService,
  logOutService,
  exchangeCodeForAccessToken,
  fetchUser,
};
