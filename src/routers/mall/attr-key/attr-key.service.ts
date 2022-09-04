import { Injectable } from '@nestjs/common';
import { CreateAttrKeyDto } from './dto/create-attr-key.dto';
import { UpdateAttrKeyDto } from './dto/update-attr-key.dto';

@Injectable()
export class AttrKeyService {
  create(createAttrKeyDto: CreateAttrKeyDto) {
    return 'This action adds a new attrKey';
  }

  findAll() {
    return `This action returns all attrKey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attrKey`;
  }

  update(id: number, updateAttrKeyDto: UpdateAttrKeyDto) {
    return `This action updates a #${id} attrKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} attrKey`;
  }
}
