import { ApiProperty } from '@nestjs/swagger';

export class SuccessMessageDto {
  @ApiProperty({
    description: 'Mensagem de sucesso da operação.',
    example: 'Operação realizada com sucesso.',
  })
  message: string;

  @ApiProperty({
    description: 'Código de status HTTP da resposta.',
    example: 200,
    required: false, // Opcional, pode ser inferido
  })
  statusCode?: number;
}