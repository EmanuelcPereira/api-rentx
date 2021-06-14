import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDto): Promise<UserTokens> {
    const userTokens = new UserTokens();

    Object.assign(userTokens, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userTokens);

    return userTokens;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    );

    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter(
      (userToken) => userToken.id !== id
    );
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }
}

export { UsersTokensRepositoryInMemory };
