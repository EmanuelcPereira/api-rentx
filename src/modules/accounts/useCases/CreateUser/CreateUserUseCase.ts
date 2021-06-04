import { injectable, inject } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error("user already exists");
    }

    this.usersRepository.create({
      name,
      password,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
