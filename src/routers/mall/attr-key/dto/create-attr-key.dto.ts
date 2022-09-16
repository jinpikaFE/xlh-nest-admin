import { OmitType } from '@nestjs/swagger';
import { AttrKey } from '../entities/attr-key.entity';

export class CreateAttrKeyDto extends OmitType(AttrKey, ['category']) {}
