import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { // 'jwt' refere-se à JwtStrategy
  handleRequest(err, user, info) {
    // Você pode lançar uma exceção baseada em `info` ou `err` aqui
    if (err || !user) {
      // Se houver erro ou o usuário não for encontrado (token inválido/expirado), lança UnauthorizedException
      // A mensagem de 'info' pode ser útil para depuração, ex: 'No auth token', 'jwt expired'
      throw err || new UnauthorizedException(info?.message || 'Não autorizado');
    }
    return user; // Retorna o usuário se a autenticação for bem-sucedida
  }
}
