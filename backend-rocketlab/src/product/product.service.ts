import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<any> {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<any> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<any> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number): Promise<any> {
    return this.prisma.product.delete({ where: { id } });
  }
}
