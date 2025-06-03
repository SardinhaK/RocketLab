import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
