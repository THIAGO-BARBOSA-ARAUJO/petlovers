import prisma from "@/config/database";
import { address } from "@prisma/client";

async function FindAddessByUserId(userId: number): Promise<address[]> {
  return prisma.address.findMany({
    where: {
      userId,
    },
    orderBy: {
        id: "asc"
    }
  });
}

async function CreateAddess(dataAddress: Omit<address, "id">){
  return prisma.address.create({
    data: dataAddress
  });
}

async function FindAddressById(id: number) {
  return prisma.address.findFirst({
    where: {
      id
    }
  })
}

async function DeletedAddess(id: number) {
  return prisma.address.delete({
   where: {
    id
   }
  });
}

export const Addressrepository = {
  FindAddessByUserId,
  CreateAddess,
  DeletedAddess,
  FindAddressById,
};
