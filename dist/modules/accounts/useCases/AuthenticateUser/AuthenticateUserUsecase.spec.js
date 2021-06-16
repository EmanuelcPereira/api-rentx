"use strict";

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/In-Memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/In-Memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../CreateUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let createUserUseCase;
let authenticateUserUseCase;
let dateProvider;
describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, dateProvider, usersTokensRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute({
      name: "Fulano da silva",
      email: "fulano@silva.com",
      password: "123@mudar",
      driver_license: "2345678"
    });
    const result = await authenticateUserUseCase.execute({
      email: "fulano@silva.com",
      password: "123@mudar"
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate with a non-existent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "non-existent-user",
      password: "123@mudar"
    })).rejects.toEqual(new _AppError.AppError("Wrong email or password"));
  });
  it("should not be able to authenticate with wrong password", async () => {
    await createUserUseCase.execute({
      name: "Fulano da silva",
      email: "fulano@silva.com",
      password: "123@mudar",
      driver_license: "2345678"
    });
    await expect(authenticateUserUseCase.execute({
      email: "fulano@silva.com",
      password: "wrong-password"
    })).rejects.toEqual(new _AppError.AppError("Wrong email or password"));
  });
});