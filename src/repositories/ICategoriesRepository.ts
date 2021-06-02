import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICreateCategoryDTO, ICategoriesRepository };
