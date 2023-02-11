import { notFoundError, conflictError, unauthorizedError } from "@/errors";
import { bestsellersrepository } from "@/repositories/bestsellersRepository";

async function BestSellersService() {
    return await bestsellersrepository.FindBestSellersService()
}

export const bestsellerservice = {
  BestSellersService,
};