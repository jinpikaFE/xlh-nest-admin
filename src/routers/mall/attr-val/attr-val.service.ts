import { Injectable } from '@nestjs/common';
import { CreateAttrValDto } from './dto/create-attr-val.dto';
import { UpdateAttrValDto } from './dto/update-attr-val.dto';

@Injectable()
export class AttrValService {
  create(createAttrValDto: CreateAttrValDto) {
    return 'This action adds a new attrVal';
  }

  findAll() {
    return `This action returns all attrVal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attrVal`;
  }

  update(id: number, updateAttrValDto: UpdateAttrValDto) {
    return `This action updates a #${id} attrVal`;
  }

  remove(id: number) {
    return `This action removes a #${id} attrVal`;
  }
}
