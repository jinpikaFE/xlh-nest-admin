import { PartialType } from '@nestjs/swagger';
import { QueryCommon } from 'src/types/global';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export type QueryProductVal = UpdateProductDto &
  QueryCommon & { order: string };
