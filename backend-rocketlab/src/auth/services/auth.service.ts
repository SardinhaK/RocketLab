import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<ResponseUserDto | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password && await bcrypt.compare(pass, user.password)) {
      return new ResponseUserDto(user);
    }
    return null;
  }

  async login(user: any): Promise<LoginResponseDto> {
    // Não tente remover password de ResponseUserDto
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: new ResponseUserDto(user),
    };
  }

  async getProfile(user: ResponseUserDto): Promise<ResponseUserDto> {
    return new ResponseUserDto(user);
  }
}