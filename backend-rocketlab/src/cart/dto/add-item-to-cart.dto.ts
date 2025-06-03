import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class AddItemToCartDto {
  @ApiProperty({
    description: 'ID do produto a ser adicionado ao carrinho (UUID).',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', // Use um exemplo de UUID válido
  })
  @IsNotEmpty({ message: 'O ID do produto não pode ser vazio.'})
  @IsUUID('4', { message: 'O ID do produto deve ser um UUID válido.'})
  productId: string;

  @ApiProperty({
    description: 'Quantidade do produto a ser adicionada.',
    example: 2,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'A quantidade não pode ser vazia.'})
  @IsInt({ message: 'A quantidade deve ser um número inteiro.'})
  @Min(1, { message: 'A quantidade deve ser no mínimo 1.'})
  quantity: number;
}