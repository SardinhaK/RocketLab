import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, Min, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Novo nome do produto.',
    example: 'Smartphone Modelo X Plus',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Nova descrição detalhada do produto.',
    example: 'Versão atualizada com processador mais rápido e bateria de maior duração.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Novo preço do produto em BRL.',
    example: 2199.00,
    type: 'number',
    format: 'float',
  })
  @IsOptional()
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser positivo' })
  price?: number;

  @ApiPropertyOptional({
    description: 'Nova quantidade do produto em estoque.',
    example: 45,
    type: 'integer',
  })
  @IsOptional()
  @IsNumber({}, { message: 'O estoque deve ser um número' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  stock?: number;

  @ApiPropertyOptional({
      description: 'Nova URL da imagem do produto.',
      example: 'https://example.com/images/smartphone-modelo-x-plus.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
