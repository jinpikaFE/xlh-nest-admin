import { PartialType } from '@nestjs/swagger';
import { QueryCommon } from 'src/types/global';
import { CreateAttrValDto } from './create-attr-val.dto';

export class UpdateAttrValDto extends PartialType(CreateAttrValDto) {}

export type QueryAttrVal = UpdateAttrValDto &
  QueryCommon & { order: string; noKey?: boolean };
