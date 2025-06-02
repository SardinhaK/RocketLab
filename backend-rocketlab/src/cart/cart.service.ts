import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient, Cart, CartItem, Product } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CartService {
  async getCart(cartId: number) {
    return prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    });
  }

  async addToCart(cartId: number, productId: number, quantity: number) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < quantity) throw new BadRequestException('Not enough stock');

    let cart = await prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: {} });
    }
    let item = await prisma.cartItem.findFirst({ where: { cartId, productId } });
    if (item) {
      item = await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: item.quantity + quantity },
      });
    } else {
      item = await prisma.cartItem.create({
        data: { cartId, productId, quantity },
      });
    }
    return this.getCart(cart.id);
  }

  async removeFromCart(cartId: number, productId: number) {
    await prisma.cartItem.deleteMany({ where: { cartId, productId } });
    return this.getCart(cartId);
  }

  async updateItem(cartId: number, productId: number, quantity: number) {
    if (quantity <= 0) return this.removeFromCart(cartId, productId);
    await prisma.cartItem.updateMany({ where: { cartId, productId }, data: { quantity } });
    return this.getCart(cartId);
  }

  async clearCart(cartId: number) {
    await prisma.cartItem.deleteMany({ where: { cartId } });
    return this.getCart(cartId);
  }

  async checkout(cartId: number) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });
    if (!cart || cart.items.length === 0) throw new BadRequestException('Cart is empty');
    for (const item of cart.items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) throw new BadRequestException('Not enough stock for product ' + item.productId);
      await prisma.product.update({ where: { id: item.productId }, data: { stock: product.stock - item.quantity } });
    }
    await prisma.cartItem.deleteMany({ where: { cartId } });
    return { message: 'Purchase completed successfully' };
  }
}
