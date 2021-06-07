import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Wrong email or password");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Wrong email or password");
    }

    const token = sign({}, "1b3984b0ecfbb7bcf777d2ffe3ac350a", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
