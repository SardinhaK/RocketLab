import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UsePipes, ValidationPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Para proteger rotas de admin, se necessário


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  // Para criar, atualizar e deletar produtos, geralmente é necessário ser admin.
  // Adicionarei JwtAuthGuard como exemplo, mas você pode precisar de um RoleGuard mais específico.
  @Post()
  @UseGuards(JwtAuthGuard) // Exemplo: Proteger criação de produto
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria um novo produto.', description: 'Adiciona um novo produto ao catálogo. Requer autenticação (ex: admin).' })
  @ApiCreatedResponse({ description: 'Produto criado com sucesso.', type: ProductResponseDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos para criação do produto.', type: ErrorResponseDto })
  @ApiBody({ type: CreateProductDto,
    examples: {
        smartphone: {
            summary: 'Exemplo de Smartphone',
            value: { name: 'Smartphone XPTO', description: 'Ótimo smartphone', price: 1200.00, stock: 50, imageUrl: 'http://example.com/img.png' } as CreateProductDto
        },
        notebook: {
            summary: 'Exemplo de Notebook',
            value: { name: 'Notebook Pro', description: 'Notebook potente', price: 4500.00, stock: 20 } as CreateProductDto
        }
    }
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos.', description: 'Retorna uma lista de produtos, com filtros opcionais.' })
  @ApiQuery({ name: 'name', description: 'Filtrar por nome do produto (parcial).', required: false, type: String, example: 'Smartphone' })
  @ApiQuery({ name: 'minPrice', description: 'Filtrar por preço mínimo.', required: false, type: Number, example: 100.00 })
  @ApiQuery({ name: 'maxPrice', description: 'Filtrar por preço máximo.', required: false, type: Number, example: 2000.00 })
  @ApiOkResponse({ description: 'Lista de produtos retornada com sucesso.', type: [ProductResponseDto] })
  async findAll(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<ProductResponseDto[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto pelo ID.', description: 'Retorna os detalhes de um produto específico.' })
  @ApiParam({ name: 'id', description: 'ID do produto (UUID)', type: 'string', format: 'uuid', example: 'b1c2d3e4-f5g6-7890-1234-567890abcdef' })
  @ApiOkResponse({ description: 'Produto encontrado.', type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Produto não encontrado.', type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: 'ID inválido (não é UUID).', type: ErrorResponseDto })
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Exemplo: Proteger atualização de produto
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um produto existente.', description: 'Atualiza parcialmente os dados de um produto. Requer autenticação (ex: admin).' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser atualizado (UUID)', type: 'string', format: 'uuid', example: 'b1c2d3e4-f5g6-7890-1234-567890abcdef' })
  @ApiBody({ type: UpdateProductDto,
    examples: {
        updatePriceAndStock: {
            summary: 'Exemplo atualizando preço e estoque',
            value: { price: 1150.00, stock: 45 } as UpdateProductDto
        }
    }
  })
  @ApiOkResponse({ description: 'Produto atualizado com sucesso.', type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Produto não encontrado.', type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos para atualização ou ID inválido.', type: ErrorResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    return this.productService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Exemplo: Proteger deleção de produto
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um produto.', description: 'Exclui um produto do catálogo. Requer autenticação (ex: admin).' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser removido (UUID)', type: 'string', format: 'uuid', example: 'b1c2d3e4-f5g6-7890-1234-567890abcdef' })
  @ApiNoContentResponse({ description: 'Produto removido com sucesso.'})
  @ApiNotFoundResponse({ description: 'Produto não encontrado.', type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: 'ID inválido (não é UUID).', type: ErrorResponseDto })
  async remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }
}