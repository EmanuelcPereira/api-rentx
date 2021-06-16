"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-Memory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("../../repositories/in-Memory/SpecificationsRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create a car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should be able to create a specification to an existent car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "kombi",
      description: "perua antiga",
      daily_rate: 2,
      license_plate: "abc-321",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "furgão"
    });
    const specifications_id = ["54345"];
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
  });
  it("should not be able to create a specification to an non-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists"));
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "kombi",
      description: "perua antiga",
      daily_rate: 2,
      license_plate: "abc-321",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "furgão"
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});