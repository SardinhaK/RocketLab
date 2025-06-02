import { IsEmail, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Formato de email inválido.' })
  @MaxLength(255, { message: 'O email deve ter no máximo 255 caracteres.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres.' })
  password?: string;
}
