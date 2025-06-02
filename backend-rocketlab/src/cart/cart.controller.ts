import { Controller, Post, Body, Patch, Delete, Get, UseGuards, Request, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCartByUser(req.user.id);
  }

  @Post('add')
  addToCart(@Request() req, @Body() body: { productId: number; quantity: number }) {
    return this.cartService.addToCart(req.user.id, body.productId, body.quantity);
  }

  @Patch('item/:productId')
  updateItem(@Request() req, @Param('productId') productId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItem(req.user.id, Number(productId), body.quantity);
  }

  @Delete('item/:productId')
  removeFromCart(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.id, Number(productId));
  }

  @Delete('clear')
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Post('checkout')
  checkout(@Request() req) {
    return this.cartService.checkout(req.user.id);
  }
}
