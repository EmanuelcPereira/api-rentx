"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-Memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayjsDateProvider;
describe("Create Rental", () => {
  const dayAdd24hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Toyota Bandeirante",
      description: "Veiculo utilitario off road",
      daily_rate: 100,
      license_plate: "ixi-1212",
      fine_amount: 40,
      category_id: "23456",
      brand: "Toyota"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there's another rental open for the user", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "1234",
      car_id: "121212",
      expected_return_date: dayAdd24hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1212",
      expected_return_date: dayAdd24hours
    })).rejects.toEqual(new _AppError.AppError("Already have a rental car for user!"));
  });
  it("should not be able to create new rental if there's another rental open for the car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayAdd24hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: dayAdd24hours
    })).rejects.toEqual(new _AppError.AppError("Car unavailable"));
  });
  it("should not be able to create rental with less than 24 hours", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Minimum rental hours should be 24 hours"));
  });
});