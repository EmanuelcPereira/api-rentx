import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { v4 as uuid } from "uuid";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
  async list(): Promise<Category[]> {
    const category = this.categories;

    return category;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    category.id = uuid();
    category.name = name;
    category.description = description;

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
