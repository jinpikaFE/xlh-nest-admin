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
import { SubSortService } from './sub-sort.service';
import { CreateSubSortDto } from './dto/create-sub-sort.dto';
import { UpdateSubSortDto } from './dto/update-sub-sort.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/token.guard';
import { MyValidationPipe } from 'src/pipe/validation.pipe';

@ApiTags('mall/sub-sort')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RbacGuard)
@Controller('api/mall/sub-sort')
export class SubSortController {
  constructor(private readonly subSortService: SubSortService) {}

  @UsePipes(new MyValidationPipe())
  @ApiBody({ type: CreateSubSortDto })
  @Post()
  create(@Body() createSubSortDto: CreateSubSortDto) {
    return this.subSortService.create(createSubSortDto);
  }

  @Get()
  filterQuery(@Query() Query) {
    return this.subSortService.filterQuery(Query);
  }

  @Get('/all')
  findAll() {
    return this.subSortService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subSortService.findOne(id);
  }

  @UsePipes(new MyValidationPipe())
  @Patch(':id')
  @ApiBody({ type: UpdateSubSortDto })
  update(@Param('id') id: string, @Body() updateSubSortDto: UpdateSubSortDto) {
    return this.subSortService.update(id, updateSubSortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subSortService.remove(id);
  }
}
