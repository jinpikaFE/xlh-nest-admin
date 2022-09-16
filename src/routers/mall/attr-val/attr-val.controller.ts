import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/guards/token.guard';
import { MyValidationPipe } from 'src/pipe/validation.pipe';
import { AttrValService } from './attr-val.service';
import { CreateAttrValDto } from './dto/create-attr-val.dto';
import { QueryAttrVal, UpdateAttrValDto } from './dto/update-attr-val.dto';

@ApiTags('mall/attr-val')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RbacGuard)
@Controller('api/mall/attr-val')
export class AttrValController {
  constructor(private readonly attrValService: AttrValService) {}

  @UsePipes(new MyValidationPipe())
  @Post()
  @ApiBody({ type: CreateAttrValDto })
  create(@Body() createAttrValDto: CreateAttrValDto) {
    return this.attrValService.create(createAttrValDto);
  }

  @Get()
  findAll(@Query() Query: QueryAttrVal) {
    return this.attrValService.findAll(Query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attrValService.findOne(id);
  }

  @UsePipes(new MyValidationPipe())
  @Patch(':id')
  @ApiBody({ type: UpdateAttrValDto })
  update(@Param('id') id: string, @Body() updateAttrValDto: UpdateAttrValDto) {
    return this.attrValService.update(id, updateAttrValDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attrValService.remove(id);
  }
}
