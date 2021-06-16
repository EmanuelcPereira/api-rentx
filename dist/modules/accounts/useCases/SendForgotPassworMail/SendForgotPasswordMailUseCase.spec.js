"use strict";

var _UsersRepositoryInMemory = require("../../repositories/In-Memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/In-Memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-Memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot password", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "123456",
      name: "Fulano da Silva",
      email: "fulano@silva.com",
      password: "fulano@123"
    });
    await sendForgotPasswordMailUseCase.execute("fulano@silva.com");
    expect(sendMail).toBeCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("non-existent@email.com")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "123456",
      name: "Siclano da Silva",
      email: "siclano@silva.com",
      password: "siclano@123"
    });
    await sendForgotPasswordMailUseCase.execute("siclano@silva.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});