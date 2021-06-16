import { classToClass } from "class-transformer";
import { IUserResponseDto } from "../dtos/IUserResponseDto";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDto({
    name,
    id,
    email,
    driver_license,
    avatar,
    avatar_url,
  }: User): IUserResponseDto {
    const user = classToClass({
      email,
      id,
      name,
      driver_license,
      avatar,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
