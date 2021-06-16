"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-Memory/CarsRepositoryInMemory");

var _CreateCarUseCase = require("../CreateCar/CreateCarUseCase");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepository;
let createCarUseCase;
describe("List cars", () => {
  beforeEach(() => {
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepository);
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepository);
  });
  it("should be able to list all available cars", async () => {
    const car = await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "volkswagen"
    });
    expect(cars[0].brand).toEqual("volkswagen");
  });
  it("should be able to list all available cars by name", async () => {
    await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "fusca"
    });
    expect(cars[0].name).toEqual("fusca");
  });
  it("should be able to list all available cars by category", async () => {
    await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "rsrsrsrsrs"
    });
    expect(cars[0].category_id).toEqual("rsrsrsrsrs");
  });
});