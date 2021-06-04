import { ICreateUserDTO } from "../dtos/ICreateUserDto";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
}

export { IUsersRepository };
