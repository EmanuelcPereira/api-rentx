import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/In-Memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
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
    expect(async () => {
      await createUserUseCase.execute({
        name: "Fulano da silva",
        email: "fulano@silva.com",
        password: "123@mudar",
        driver_license: "2345678",
      });

      await authenticateUserUseCase.execute({
        email: "non-existent-user",
        password: "123@mudar",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with a non-existent user", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Fulano da silva",
        email: "fulano@silva.com",
        password: "123@mudar",
        driver_license: "2345678",
      });

      await authenticateUserUseCase.execute({
        email: "fulano@silva.com",
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
