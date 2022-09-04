import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttrKeyService } from './attr-key.service';
import { CreateAttrKeyDto } from './dto/create-attr-key.dto';
import { UpdateAttrKeyDto } from './dto/update-attr-key.dto';

@Controller('attr-key')
export class AttrKeyController {
  constructor(private readonly attrKeyService: AttrKeyService) {}

  @Post()
  create(@Body() createAttrKeyDto: CreateAttrKeyDto) {
    return this.attrKeyService.create(createAttrKeyDto);
  }

  @Get()
  findAll() {
    return this.attrKeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attrKeyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttrKeyDto: UpdateAttrKeyDto) {
    return this.attrKeyService.update(+id, updateAttrKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attrKeyService.remove(+id);
  }
}
