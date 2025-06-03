import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  id: string;

  @ApiProperty({ example: 'Laptop Pro 15"' })
  name: string;

  @ApiPropertyOptional({ example: 'Laptop de alta performance com 16GB RAM e SSD 512GB.' })
  description?: string;

  @ApiProperty({ example: 7500.50 })
  price: number;

  @ApiProperty({ example: 25 })
  stock: number;

  @ApiPropertyOptional({ example: 'https://example.com/images/laptop-pro-15.jpg' })
  imageUrl?: string;

  @ApiProperty({ example: '2024-05-10T08:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-05-28T14:45:10.000Z' })
  updatedAt: Date;
}