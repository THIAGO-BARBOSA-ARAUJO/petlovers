import { notFoundError } from "@/errors";
import { usersrepository } from "@/repositories/userRepository";

async function UserService(userId: number) {
  const user = await usersrepository.FindUsersService(userId);
  if (!user) throw notFoundError();

  return user;
}

export const userservice = {
  UserService,
};
