import { OmitType } from '@nestjs/swagger';
import { AttrVal } from '../entities/attr-val.entity';

export class CreateAttrValDto extends OmitType(AttrVal, ['attr_key']) {}
