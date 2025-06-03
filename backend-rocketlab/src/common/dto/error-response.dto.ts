import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP da resposta.',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro ou lista de mensagens de erro (em caso de validação).',
    example: ['password should not be empty', 'password must be a string'],
    oneOf: [ // Para indicar que pode ser string ou array de strings
      { type: 'string', example: 'Recurso não encontrado.' },
      { type: 'array', items: { type: 'string' }, example: ['campo X é obrigatório'] }
    ]
  })
  message: string[] | string;

  @ApiProperty({
    description: 'Nome do erro HTTP.',
    example: 'Bad Request',
  })
  error: string;
}