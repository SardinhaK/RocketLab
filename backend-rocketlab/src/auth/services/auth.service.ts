import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../../users/users.service'; // Ajuste o caminho
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any | null> {
    const user = await this.usersService.findOneByEmail(email); // Precisa retornar a senha para comparar
    if (user && (await user.comparePassword(pass))) {
      return user; // Retorna o usuário completo, incluindo a senha hasheada (não será exposto)
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string; user: ResponseUserDto }> {
    // O 'user' aqui já foi validado pela LocalStrategy e não contém a senha
    // Mas para gerar o payload do JWT, precisamos do ID e email originais.
    // A LocalStrategy retorna o usuário sem a senha, então podemos pegar o ID dela.
    // Ou, se a LocalStrategy retornasse o User completo, pegaríamos daqui.
    // Para consistência, vamos assumir que LocalStrategy retorna o usuário sem senha,
    // mas o AuthService pode precisar buscar o usuário novamente se precisar de mais dados para o payload.
    // Neste caso, o `user.id` e `user.email` já vêm da LocalStrategy.

    if (!user || !user.id || !user.email) {
        // Isso não deveria acontecer se a LocalStrategy estiver correta
        throw new InternalServerErrorException("Erro ao processar informações do usuário para login.");
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponseData } = user; // Garante que a senha não está aqui

    return {
      access_token: this.jwtService.sign(payload),
      user: new ResponseUserDto(userResponseData),
    };
  }

  // Opcional: Método para obter o perfil do usuário logado (usando JwtAuthGuard)
  async getProfile(user: any): Promise<ResponseUserDto> {
    // O 'user' aqui é o que foi validado e anexado ao request pela JwtStrategy
    // Ele já deve ser um ResponseUserDto ou um User sem a senha.
    // Se for um User completo, certifique-se de remover a senha.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return new ResponseUserDto(result);
  }
}