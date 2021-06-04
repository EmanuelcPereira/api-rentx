import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  async create({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });

    await this.ormRepository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.ormRepository.findOne({ username });

    return user;
  }
}

export { UsersRepository };
