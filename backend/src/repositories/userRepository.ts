import prisma from "@/config/database";

async function FindUsersService(userId: number) {
    return prisma.users.findFirst({
        where: {
          id: userId
      }
  });
}

export const usersrepository = {
  FindUsersService,
};
