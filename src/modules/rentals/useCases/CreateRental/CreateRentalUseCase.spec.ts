import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1212",
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create new rental if there's another rental open for the user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "1212",
        expected_return_date: dayAdd24hours,
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "1212",
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create new rental if there's another rental open for the car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "1212",
        expected_return_date: dayAdd24hours,
      });

      await createRentalUseCase.execute({
        user_id: "1235",
        car_id: "1212",
        expected_return_date: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create rental with less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "1212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
