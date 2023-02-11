import { notFoundError, conflictError, unauthorizedError } from "@/errors";
import { animalsrepository } from "@/repositories/animalsRepository";

async function categoryService(animal: string) {
  const animals = await animalsrepository.GetProductsByCategory(animal);
  
  if (animals.length <= 0) throw notFoundError();

  return animals;
}

export const animalservice = {
  categoryService
};
