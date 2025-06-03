import { ApiPropertyOptional } from '@nestjs/swagger'; // Usar ApiPropertyOptional para campos opcionais
import { IsEmail, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Novo nome completo do usuário.',
    example: 'João da Silva Santos',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Novo endereço de e-mail único do usuário.',
    example: 'joao.santos@example.com',
    maxLength: 255,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Formato de email inválido.' })
  @MaxLength(255, { message: 'O email deve ter no máximo 255 caracteres.' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Nova senha do usuário. Mínimo de 6 caracteres.',
    example: 'novaSenhaSuperForte456',
    minLength: 6,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres.' })
  password?: string;
}
