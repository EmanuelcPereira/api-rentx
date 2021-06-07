import { v4 as uuid } from "uuid";

import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    user.id = uuid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.driver_license = driver_license;

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
