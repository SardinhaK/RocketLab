import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto.',
    example: 'Smartphone Modelo X',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do produto.',
    example: 'Smartphone com tela AMOLED de 6.5 polegadas, 128GB de armazenamento e câmera de 48MP.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Preço do produto em BRL.',
    example: 1999.99,
    type: 'number',
    format: 'float',
  })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser positivo' })
  price: number;

  @ApiProperty({
    description: 'Quantidade do produto em estoque.',
    example: 50,
    type: 'integer',
  })
  @IsNumber({}, { message: 'O estoque deve ser um número' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  stock: number;

  @ApiPropertyOptional({
      description: 'URL da imagem do produto.',
      example: 'https://example.com/images/smartphone-modelo-x.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string; // Adicionando imageUrl conforme seu Product entity
}