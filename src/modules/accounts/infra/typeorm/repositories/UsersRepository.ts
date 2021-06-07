import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDto";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar,
    });

    await this.ormRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }
}

export { UsersRepository };
