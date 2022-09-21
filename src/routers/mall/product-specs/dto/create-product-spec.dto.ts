import { OmitType } from '@nestjs/swagger';
import { ProductSpec } from '../entities/product-spec.entity';

export class CreateProductSpecDto extends OmitType(ProductSpec, ['product']) {}
