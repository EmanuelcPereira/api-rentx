import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.ormRepository.create({ name, description });

    await this.ormRepository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.ormRepository.findOne({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.ormRepository.findByIds(ids);

    return allSpecifications;
  }
}

export { SpecificationsRepository };
