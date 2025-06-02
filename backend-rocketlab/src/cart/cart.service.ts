import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient, Cart, CartItem, Product, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CartService {
  async getCartByUser(userId: number) {
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
    return cart;
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < quantity) throw new BadRequestException('Not enough stock');

    let cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
    let item = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    if (item) {
      item = await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: item.quantity + quantity },
      });
    } else {
      item = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }
    return this.getCartByUser(userId);
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
    return this.getCartByUser(userId);
  }

  async updateItem(userId: number, productId: number, quantity: number) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');
    if (quantity <= 0) return this.removeFromCart(userId, productId);
    await prisma.cartItem.updateMany({ where: { cartId: cart.id, productId }, data: { quantity } });
    return this.getCartByUser(userId);
  }

  async clearCart(userId: number) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return this.getCartByUser(userId);
  }

  async checkout(userId: number) {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
    if (!cart || cart.items.length === 0) throw new BadRequestException('Cart is empty');
    for (const item of cart.items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) throw new BadRequestException('Not enough stock for product ' + item.productId);
      await prisma.product.update({ where: { id: item.productId }, data: { stock: product.stock - item.quantity } });
    }
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { message: 'Purchase completed successfully' };
  }
}
