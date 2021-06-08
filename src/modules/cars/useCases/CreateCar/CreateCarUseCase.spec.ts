import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with existent license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car name",
        description: "car description",
        daily_rate: 12345,
        license_plate: "abc-123",
        fine_amount: 120,
        brand: "ford",
        category_id: "ergjsdfgsdfgsfgv",
      });

      await createCarUseCase.execute({
        name: "Car name 2",
        description: "car description",
        daily_rate: 12345,
        license_plate: "abc-123",
        fine_amount: 120,
        brand: "ford",
        category_id: "ergjsdfgsdfgsfgv",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new car with availability true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "car description",
      daily_rate: 12345,
      license_plate: "abc-123",
      fine_amount: 120,
      brand: "ford",
      category_id: "ergjsdfgsdfgsfgv",
    });

    expect(car.available).toBe(true);
  });
});
