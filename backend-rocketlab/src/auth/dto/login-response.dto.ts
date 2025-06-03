import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token de acesso JWT.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW8uc2lsdmFAZXhhbXBsZS5jb20iLCJzdWIiOiJhMGVlYmM5OS05YzBiLTRlZjgtYmI2ZC02YmI5YmQzODBhMTEiLCJpYXQiOjE2MjI1NjQ4MDAsImV4cCI6MTYyMjU2ODQwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  access_token: string;

  @ApiProperty({
    description: 'Informações do usuário autenticado.',
    type: ResponseUserDto,
  })
  user: ResponseUserDto;
}
