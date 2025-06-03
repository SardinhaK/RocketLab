import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../product/dto/product-response.dto'; // Caminho correto

export class CartItemResponseDto {
  @ApiProperty({ example: 'c1d2e3f4-g5h6-7890-1234-567890abcdef' })
  id: string;

  @ApiProperty({ type: () => ProductResponseDto }) // Para mostrar o objeto aninhado
  product: ProductResponseDto;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 15001.00, description: 'Preço total para este item (product.price * quantity)' })
  totalPrice: number; // Calculado: product.price * quantity
}