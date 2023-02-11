import prisma from "@/config/database";
import { users, sessions } from "@prisma/client";
import {CreateUserParams} from "../services/authService"

async function CreatedUser(createUser: Omit<users, "id">): Promise<users> {
  return prisma.users.create({
    data: createUser,
  });
}

async function CreatedUserGitHub(createUser: CreateUserParams): Promise<users> {
  return prisma.users.create({
    data: createUser,
  });
}

async function GetUsersByEmail(email: string) {
  return prisma.users.findFirst({
    where: {
      email,
    },
  });
}

async function CreateSession(createSession: Omit<sessions, "id">) {
  return prisma.sessions.create({
    data: createSession
  });
}

async function GetSeesionByUserId(userId: number) {
  return prisma.sessions.findFirst({
    where: {
      userId
    }
  })
}

async function GetSeesionByToken(token: string) {
  return prisma.sessions.findFirst({
    where: {
      token,
    },
  });
}

async function DeleteSessionByUserId(userId: number) {
  return prisma.sessions.deleteMany({
    where: {
      userId,
    },
  });
}

export const authrepository = {
  CreatedUser,
  GetUsersByEmail,
  CreateSession,
  GetSeesionByUserId,
  GetSeesionByToken,
  DeleteSessionByUserId,
  CreatedUserGitHub,
};
