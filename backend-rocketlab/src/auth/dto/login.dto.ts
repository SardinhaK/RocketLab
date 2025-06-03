import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Endereço de e-mail do usuário para login.',
    example: 'usuario.teste@example.com',
  })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  @IsEmail({}, { message: 'Formato de email inválido.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário para login.',
    example: 'minhasenha123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}
