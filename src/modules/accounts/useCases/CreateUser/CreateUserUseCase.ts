import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

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
      throw new AppError("user already exists");
    }

    const hashPassword = await hash(password, 10);

    this.usersRepository.create({
      name,
      password: hashPassword,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
