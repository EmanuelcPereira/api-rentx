"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/In-Memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("./CreateUserUseCase");

let usersRepositoryInMemory;
let createUserUseCase;
describe("Create user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to create a new user", async () => {
    const user = {
      name: "fulado da silva",
      email: "fulano@silva.com",
      password: "123@mudar",
      driver_licence: "2345678"
    };
    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_licence
    });
    const createdUser = await usersRepositoryInMemory.findByEmail(user.email);
    expect(createdUser).toHaveProperty("id");
  });
  it("should not be able to create a existent user", async () => {
    const user = {
      name: "fulado da silva",
      email: "fulano@silva.com",
      password: "123@mudar",
      driver_licence: "2345678"
    };
    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_licence
    });
    await expect(createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_licence
    })).rejects.toEqual(new _AppError.AppError("user already exists"));
  });
});