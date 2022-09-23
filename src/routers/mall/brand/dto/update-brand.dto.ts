import { PartialType } from '@nestjs/swagger';
import { QueryCommon } from 'src/types/global';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export type QueryBrandVal = UpdateBrandDto & QueryCommon;
