import {} from "@prisma/client";
import {
  notFoundError,
  badRequestError,
} from "@/errors";
import { searchRepository } from "@/repositories/searchRepository";

async function GetSearch(search: string) {
  if (!search) throw badRequestError();

  const resp = await searchRepository.FindProductByName(search.toUpperCase());

  if (!resp) throw notFoundError();

  return resp;
}

export const SearchService = {
  GetSearch,
};
