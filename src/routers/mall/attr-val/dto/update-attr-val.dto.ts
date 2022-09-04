import { PartialType } from '@nestjs/swagger';
import { CreateAttrValDto } from './create-attr-val.dto';

export class UpdateAttrValDto extends PartialType(CreateAttrValDto) {}
