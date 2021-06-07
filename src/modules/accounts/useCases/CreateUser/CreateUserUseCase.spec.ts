import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/In-Memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "fulado da silva",
      email: "fulano@silva.com",
      password: "123@mudar",
      driver_licence: "2345678",
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_licence,
    });

    const createdUser = await usersRepositoryInMemory.findByEmail(user.email);

    expect(createdUser).toHaveProperty("id");
  });

  it("should not be able to create a existent user", async () => {
    expect(async () => {
      const user = {
        name: "fulado da silva",
        email: "fulano@silva.com",
        password: "123@mudar",
        driver_licence: "2345678",
      };

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        driver_license: user.driver_licence,
      });

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        driver_license: user.driver_licence,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
