import { OmitType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends OmitType(Product, [
  'category',
  'brand',
]) {}
