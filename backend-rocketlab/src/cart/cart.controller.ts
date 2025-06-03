import { Controller, Post, Body, Get, Delete, Param, UseGuards, Request, HttpCode, HttpStatus, ParseIntPipe, UsePipes, ValidationPipe, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CartResponseDto } from './dto/cart-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { SuccessMessageDto } from '../common/dto/success-message.dto';


@ApiTags('cart')
@ApiBearerAuth() // Todas as rotas do carrinho requerem autenticação
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('items')
  @ApiOperation({ summary: 'Adiciona um item ao carrinho do usuário logado.', description: 'Se o item já existir no carrinho, sua quantidade é atualizada. Caso contrário, um novo item é adicionado.' })
  @ApiBody({ type: AddItemToCartDto,
    examples: {
        addItem: {
            summary: 'Adicionar produto ao carrinho',
            value: { productId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', quantity: 1 } as AddItemToCartDto
        }
    }
  })
  @ApiCreatedResponse({ description: 'Item adicionado/atualizado no carrinho com sucesso.', type: CartResponseDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou produto com estoque insuficiente.', type: ErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Produto não encontrado.', type: ErrorResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async addItemToCart(@Request() req: { user: any }, @Body() addItemToCartDto: AddItemToCartDto): Promise<CartResponseDto> {
    const userId = Number(req.user.id);
    return this.cartService.addItem(userId, Number(addItemToCartDto.productId), addItemToCartDto.quantity);
  }

  @Get()
  @ApiOperation({ summary: 'Visualiza o carrinho do usuário logado.', description: 'Retorna todos os itens e o valor total do carrinho do usuário autenticado.' })
  @ApiOkResponse({ description: 'Carrinho retornado com sucesso.', type: CartResponseDto })
  @ApiNotFoundResponse({ description: 'Carrinho não encontrado para o usuário (pode significar carrinho vazio ou erro).', type: ErrorResponseDto })
  async viewCart(@Request() req: { user: any }): Promise<CartResponseDto> {
    const userId = Number(req.user.id);
    return this.cartService.getCartByUserId(userId);
  }

  @Delete('items/:cartItemId')
  @HttpCode(HttpStatus.OK) // Retorna 200 com o carrinho atualizado ou 204 se preferir
  @ApiOperation({ summary: 'Remove um item específico do carrinho.', description: 'Remove um item do carrinho do usuário logado, usando o ID do item do carrinho.' })
  @ApiParam({ name: 'cartItemId', description: 'ID do item do carrinho a ser removido (number)', type: 'number', example: 1 })
  @ApiOkResponse({ description: 'Item removido com sucesso. Retorna o carrinho atualizado.', type: CartResponseDto })
  @ApiNotFoundResponse({ description: 'Item do carrinho não encontrado ou carrinho não pertence ao usuário.', type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: 'ID do item do carrinho inválido.', type: ErrorResponseDto })
  async removeItemFromCart(@Request() req: { user: any }, @Param('cartItemId', ParseIntPipe) cartItemId: number): Promise<CartResponseDto> {
    const userId = Number(req.user.id);
    return this.cartService.removeItem(userId, cartItemId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Limpa todos os itens do carrinho do usuário logado.', description: 'Remove todos os itens do carrinho do usuário autenticado.' })
  @ApiOkResponse({ description: 'Carrinho limpo com sucesso.', type: SuccessMessageDto,
    content: {
        'application/json': {
            example: { message: 'Carrinho esvaziado com sucesso.', statusCode: 200 }
        }
    }
  })
  @ApiNotFoundResponse({ description: 'Carrinho não encontrado para o usuário.', type: ErrorResponseDto })
  async clearCart(@Request() req: { user: any }): Promise<SuccessMessageDto> {
    const userId = req.user.id;
    await this.cartService.clearCart(userId);
    return { message: 'Carrinho esvaziado com sucesso.', statusCode: HttpStatus.OK };
  }

  // Endpoint para finalizar compra (checkout)
  // Você mencionou "Eu gostaria de poder finalizar a compra do meu carrinho de compras."
  // Este endpoint seria mais complexo, envolvendo a criação de um Pedido (Order)
  // e possivelmente integração com pagamento. Por ora, um exemplo simples:
  @Post('checkout')
  @ApiOperation({
    summary: 'Finaliza a compra do carrinho do usuário logado.',
    description: 'Converte o carrinho em um pedido, limpa o carrinho e atualiza o estoque. (Simulação)',
  })
  @ApiCreatedResponse({ description: 'Compra finalizada com sucesso. Retorna os detalhes do pedido (simulado).', type: SuccessMessageDto }) // Idealmente, retornaria um OrderResponseDto
  @ApiBadRequestResponse({ description: 'Carrinho vazio ou erro ao processar o pedido (ex: item sem estoque).', type: ErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Carrinho não encontrado.', type: ErrorResponseDto })
  async checkout(@Request() req: { user: any }): Promise<SuccessMessageDto> { // Deveria retornar um OrderDto
    const userId = req.user.id;
    // Aqui viria a lógica para:
    // 1. Validar o carrinho (ex: verificar estoque novamente)
    // 2. Criar uma entidade 'Order' e 'OrderItems' a partir do carrinho.
    // 3. (Opcional) Integrar com um gateway de pagamento.
    // 4. Deduzir o estoque dos produtos.
    // 5. Limpar o carrinho.
    // Por enquanto, vamos apenas simular e chamar um método que você criaria no CartService ou OrderService.
    try {
        const orderDetails = await this.cartService.checkout(userId); // Este método precisa ser implementado!
        return { message: 'Compra finalizada com sucesso!', statusCode: HttpStatus.CREATED /*, data: orderDetails */ };
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw new NotFoundException(error.message);
        } else if (error instanceof BadRequestException) {
            throw new BadRequestException(error.message);
        }
        throw new InternalServerErrorException('Erro ao finalizar a compra.');
    }
  }
}