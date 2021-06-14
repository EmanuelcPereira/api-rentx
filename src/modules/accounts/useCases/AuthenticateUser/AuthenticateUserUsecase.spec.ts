import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/In-Memory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../repositories/In-Memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      dateProvider,
      usersTokensRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute({
      name: "Fulano da silva",
      email: "fulano@silva.com",
      password: "123@mudar",
      driver_license: "2345678",
    });

    const result = await authenticateUserUseCase.execute({
      email: "fulano@silva.com",
      password: "123@mudar",
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with a non-existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "non-existent-user",
        password: "123@mudar",
      })
    ).rejects.toEqual(new AppError("Wrong email or password"));
  });

  it("should not be able to authenticate with wrong password", async () => {
    await createUserUseCase.execute({
      name: "Fulano da silva",
      email: "fulano@silva.com",
      password: "123@mudar",
      driver_license: "2345678",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "fulano@silva.com",
        password: "wrong-password",
      })
    ).rejects.toEqual(new AppError("Wrong email or password"));
  });
});
