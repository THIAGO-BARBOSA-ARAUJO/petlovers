import prisma from "@/config/database";
import { bestsellers } from "@prisma/client";


async function FindBestSellersService(): Promise<bestsellers[]> {
  return prisma.bestsellers.findMany();
}

export const bestsellersrepository = {
  FindBestSellersService,
};
