import { PartialType } from '@nestjs/swagger';
import { CreateAttrKeyDto } from './create-attr-key.dto';

export class UpdateAttrKeyDto extends PartialType(CreateAttrKeyDto) {}
