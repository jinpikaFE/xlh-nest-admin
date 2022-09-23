import { PartialType } from '@nestjs/swagger';
import { QueryCommon } from 'src/types/global';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export type QueryCategoryVal = UpdateCategoryDto &
  QueryCommon & { order: string };
