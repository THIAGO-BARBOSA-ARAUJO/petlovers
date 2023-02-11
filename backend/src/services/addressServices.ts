import {Addressrepository} from "@/repositories/addressRepository";
import {notFoundError, badRequestError, unauthorizedError, conflictError} from "@/errors";
import { address } from "@prisma/client";
import axios from "axios";

async function FindAddressService(userId: number) {
  const address = await Addressrepository.FindAddessByUserId(userId);
  if(!address) throw notFoundError()
  return address
}

async function CreateAddressService(dataAddress: Omit<address, "id">) {

  if(!dataAddress) throw badRequestError()
  
  const add = await Addressrepository.CreateAddess(dataAddress);
  return add
}

async function DeletedAddressService(id: number, userId: number) {
  if (!id) throw notFoundError();

  const address = await Addressrepository.FindAddressById(id)
  
  if(!address) throw notFoundError()

  if(address.userId != userId) throw unauthorizedError()

  return Addressrepository.DeletedAddess(id);
  
}

async function GetCepService(cep: string) {

  if(!cep) throw badRequestError()

  const cepp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  
  if (!cepp) throw notFoundError();
  return cepp;
}

export const addressService = {
  FindAddressService,
  CreateAddressService,
  DeletedAddressService,
  GetCepService,
};
