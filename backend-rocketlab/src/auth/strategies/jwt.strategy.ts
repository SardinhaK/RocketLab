import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants/jwt.constants';
import { UsersService } from '../../users/users.service'; // Ajuste o caminho
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<ResponseUserDto> {
    // O 'payload' aqui é o objeto decodificado do JWT
    // 'sub' é o ID do usuário que definimos no AuthService ao gerar o token
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado ou token inválido.');
    }
    // Retornamos o usuário (sem a senha, pois ResponseUserDto já faz isso)
    // Este usuário será injetado no objeto `request` (ex: req.user)
    return user;
  }
}