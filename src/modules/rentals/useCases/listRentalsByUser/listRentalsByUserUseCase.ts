import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalRepository
  ) { }

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
