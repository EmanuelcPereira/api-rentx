import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.ormRepository.create({ name, description });

    await this.ormRepository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.ormRepository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
