import { PartialType } from '@nestjs/swagger';
import { QueryCommon } from 'src/types/global';
import { CreateProductSpecDto } from './create-product-spec.dto';

export class UpdateProductSpecDto extends PartialType(CreateProductSpecDto) {}

export type QueryProductSpecsVal = UpdateProductSpecDto & QueryCommon;
