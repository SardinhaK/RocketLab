import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário.',
    example: 'João da Silva',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'Endereço de e-mail único do usuário.',
    example: 'joao.silva@example.com',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  @IsEmail({}, { message: 'Formato de email inválido.' })
  @MaxLength(255, { message: 'O email deve ter no máximo 255 caracteres.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário. Mínimo de 6 caracteres.',
    example: 'senhaForte123',
    minLength: 6,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres.' })
  password: string;
}