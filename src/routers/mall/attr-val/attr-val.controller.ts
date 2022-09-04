import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttrValService } from './attr-val.service';
import { CreateAttrValDto } from './dto/create-attr-val.dto';
import { UpdateAttrValDto } from './dto/update-attr-val.dto';

@Controller('attr-val')
export class AttrValController {
  constructor(private readonly attrValService: AttrValService) {}

  @Post()
  create(@Body() createAttrValDto: CreateAttrValDto) {
    return this.attrValService.create(createAttrValDto);
  }

  @Get()
  findAll() {
    return this.attrValService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attrValService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttrValDto: UpdateAttrValDto) {
    return this.attrValService.update(+id, updateAttrValDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attrValService.remove(+id);
  }
}
