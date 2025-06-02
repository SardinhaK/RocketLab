import { Controller, Post, Body, Param, Patch, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  getCart(@Param('cartId') cartId: string) {
    return this.cartService.getCart(Number(cartId));
  }

  @Post(':cartId/add')
  addToCart(@Param('cartId') cartId: string, @Body() body: { productId: number; quantity: number }) {
    return this.cartService.addToCart(Number(cartId), body.productId, body.quantity);
  }

  @Patch(':cartId/item/:productId')
  updateItem(@Param('cartId') cartId: string, @Param('productId') productId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItem(Number(cartId), Number(productId), body.quantity);
  }

  @Delete(':cartId/item/:productId')
  removeFromCart(@Param('cartId') cartId: string, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(Number(cartId), Number(productId));
  }

  @Delete(':cartId/clear')
  clearCart(@Param('cartId') cartId: string) {
    return this.cartService.clearCart(Number(cartId));
  }

  @Post(':cartId/checkout')
  checkout(@Param('cartId') cartId: string) {
    return this.cartService.checkout(Number(cartId));
  }
}
