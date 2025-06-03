import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartResponseDto } from './dto/cart-response.dto';
import { CartItemResponseDto } from './dto/cart-item-response.dto';
import { ProductResponseDto } from '../product/dto/product-response.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  private mapCartToResponseDto(cart: any): CartResponseDto {
    if (!cart) return {
      id: 0,
      userId: 0,
      items: [],
      totalAmount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    let totalAmount = 0;
    const items: CartItemResponseDto[] = (cart.items || []).map((item: any) => {
      const product: ProductResponseDto = {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        stock: item.product.stock,
        imageUrl: item.product.imageUrl,
        createdAt: item.product.createdAt,
        updatedAt: item.product.updatedAt,
      };
      const totalPrice = product.price * item.quantity;
      totalAmount += totalPrice;
      return {
        id: item.id,
        product,
        quantity: item.quantity,
        totalPrice,
      };
    });
    return {
      id: cart.id,
      userId: cart.userId,
      items,
      totalAmount,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  async getCartByUser(userId: number): Promise<CartResponseDto> {
    let cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) {
      return {
        id: 0,
        userId: 0,
        items: [],
        totalAmount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return this.mapCartToResponseDto(cart);
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartResponseDto> {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < quantity) throw new BadRequestException('Not enough stock');

    let cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }
    let item = await this.prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    if (item) {
      item = await this.prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: item.quantity + quantity },
      });
    } else {
      item = await this.prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }
    return this.getCartByUser(userId);
  }

  async removeFromCart(userId: number, productId: number): Promise<CartResponseDto> {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
    return this.getCartByUser(userId);
  }

  async updateItem(userId: number, productId: number, quantity: number): Promise<CartResponseDto> {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');
    if (quantity <= 0) return this.removeFromCart(userId, productId);
    await this.prisma.cartItem.updateMany({ where: { cartId: cart.id, productId }, data: { quantity } });
    return this.getCartByUser(userId);
  }

  async clearCart(userId: number): Promise<CartResponseDto> {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return this.getCartByUser(userId);
  }

  async checkout(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
    if (!cart || cart.items.length === 0) throw new BadRequestException('Cart is empty');
    for (const item of cart.items) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) throw new BadRequestException('Not enough stock for product ' + item.productId);
      await this.prisma.product.update({ where: { id: item.productId }, data: { stock: product.stock - item.quantity } });
    }
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { message: 'Purchase completed successfully' };
  }

  async addItem(userId: number, productId: number, quantity: number): Promise<CartResponseDto> {
    return this.addToCart(userId, productId, quantity);
  }

  async removeItem(userId: number, cartItemId: number): Promise<CartResponseDto> {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');
    await this.prisma.cartItem.deleteMany({ where: { id: cartItemId, cartId: cart.id } });
    return this.getCartByUser(userId);
  }

  async getCartByUserId(userId: number): Promise<CartResponseDto> {
    return this.getCartByUser(userId);
  }
}
