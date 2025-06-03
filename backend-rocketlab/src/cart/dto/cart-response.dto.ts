import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CartItemResponseDto } from './cart-item-response.dto';

export class CartResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiPropertyOptional({
    description: 'ID do usuário proprietário do carrinho (se aplicável).',
    example: 1,
  })
  userId?: number; // Se o carrinho for associado a um usuário

  @ApiProperty({
    description: 'Lista de itens no carrinho.',
    type: [CartItemResponseDto],
  })
  items: CartItemResponseDto[];

  @ApiProperty({
    description: 'Valor total de todos os itens no carrinho.',
    example: 25050.75,
  })
  totalAmount: number;

  @ApiProperty({ example: '2024-06-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-06-01T11:30:00.000Z' })
  updatedAt: Date;
}
