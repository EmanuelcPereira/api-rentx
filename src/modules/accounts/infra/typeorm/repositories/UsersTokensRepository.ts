import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { Repository, getRepository } from "typeorm";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserTokens>;
  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = this.ormRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.ormRepository.findOne({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
