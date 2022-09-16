import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import { CreateUserDTO } from "../users/dtos/createUserDTO";
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
  public async signIn(dto: SignInDTO) {
    const hashedPassword = await bcrypt.hash(dto.password, 13);
    const document = new UserDocument();

    document.build(null, dto.name, dto.email, hashedPassword, Role.normal);
    return this.repository.create(document);
  }
  public async validateUser(username: string, password: string) {
    const user = await this.usersService.getByEmail(username);
    if (!user) {
      throw new NotAcceptableException("could not find the user");
    }
    const passwordValid = await bcrypt.compare(password, user[0].password);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const token = await this.jwtService.sign(payload).toString();
    return {accessToken: `Bearer ${token}`}
  }
}
