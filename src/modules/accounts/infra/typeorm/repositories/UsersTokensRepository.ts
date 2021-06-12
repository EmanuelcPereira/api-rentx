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
}

export { UsersTokensRepository };
