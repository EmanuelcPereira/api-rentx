import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
    const specification = this.ormRepository.create({ name, description });

    await this.ormRepository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.ormRepository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
