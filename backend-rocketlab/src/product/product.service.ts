import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const prisma = new PrismaClient();

@Injectable()
export class ProductService {
  async create(data: CreateProductDto): Promise<Product> {
    return prisma.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    return prisma.product.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Product> {
    return prisma.product.delete({ where: { id } });
  }
}
