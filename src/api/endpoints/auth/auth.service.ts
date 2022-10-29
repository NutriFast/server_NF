import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import * as bcrypt from "bcrypt";
import { UserDocument } from "src/api/infrastructure/documents/userDocument";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/api/infrastructure/constants/roles";
import { SignInDTO } from "./dtos/signInDTO";
@Injectable()
export class AuthService {
  constructor(
    private repository: UserRepository,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  private logger = new Logger(AuthService.name);
  public async signIn(dto: SignInDTO) {
    const document = new UserDocument();

    document.build(null, dto.name, dto.email, Role.normal);
    return this.repository.create(document);
  }

  async login(user: any) {
    this.logger.log(`user loggin email: ${user.email}`);
    const userFound = await this.usersService.getByEmail(user.email);
    let payload;
    if (!userFound || !userFound.length) {
      const document = new UserDocument();
      document.build(null, user.name, user.email, Role.normal);
      const newUser = await this.usersService.create(document);
      payload = { username: user.email, sub: newUser.id };
      this.logger.log(`new user created on dynamodb -> ${newUser}`);
    }
    payload = { username: user.email, sub: userFound[0].id };
    const token = await this.jwtService.sign(payload).toString();
    return { accessToken: `Bearer ${token}` };
  }
}
