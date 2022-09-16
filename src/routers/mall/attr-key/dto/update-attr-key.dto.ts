import { PartialType } from '@nestjs/swagger';
import { QueryCommon } from 'src/types/global';
import { CreateAttrKeyDto } from './create-attr-key.dto';

export class UpdateAttrKeyDto extends PartialType(CreateAttrKeyDto) {}

export type QueryAttrKey = UpdateAttrKeyDto & QueryCommon & { order: string };
