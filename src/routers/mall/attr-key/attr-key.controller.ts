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
import { AttrKeyService } from './attr-key.service';
import { CreateAttrKeyDto } from './dto/create-attr-key.dto';
import { QueryAttrKey, UpdateAttrKeyDto } from './dto/update-attr-key.dto';

@ApiTags('mall/attr-key')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RbacGuard)
@Controller('api/mall/attr-key')
export class AttrKeyController {
  constructor(private readonly attrKeyService: AttrKeyService) {}

  @UsePipes(new MyValidationPipe())
  @Post()
  @ApiBody({ type: CreateAttrKeyDto })
  create(@Body() createAttrKeyDto: CreateAttrKeyDto) {
    return this.attrKeyService.create(createAttrKeyDto);
  }

  @Get()
  findAll(@Query() Query: QueryAttrKey) {
    return this.attrKeyService.findAll(Query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attrKeyService.findOne(id);
  }

  @UsePipes(new MyValidationPipe())
  @Patch(':id')
  @ApiBody({ type: UpdateAttrKeyDto })
  update(@Param('id') id: string, @Body() updateAttrKeyDto: UpdateAttrKeyDto) {
    return this.attrKeyService.update(id, updateAttrKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attrKeyService.remove(id);
  }
}
