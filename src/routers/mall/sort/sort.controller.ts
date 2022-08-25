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
import { SortService } from './sort.service';
import { CreateSortDto } from './dto/create-sort.dto';
import { UpdateSortDto } from './dto/update-sort.dto';
import { RbacGuard } from 'src/guards/token.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MyValidationPipe } from 'src/pipe/validation.pipe';

@ApiTags('mall/sort')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RbacGuard)
@Controller('api/mall/sort')
export class SortController {
  constructor(private readonly sortService: SortService) {}

  @UsePipes(new MyValidationPipe())
  @ApiBody({ type: CreateSortDto })
  @Post()
  create(@Body() createSortDto: CreateSortDto) {
    return this.sortService.create(createSortDto);
  }

  @Get()
  filterQuery(@Query() Query) {
    return this.sortService.filterQuery(Query);
  }

  @Get('/all')
  findAll() {
    return this.sortService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sortService.findOne(id);
  }

  @UsePipes(new MyValidationPipe())
  @Patch(':id')
  @ApiBody({ type: UpdateSortDto })
  update(@Param('id') id: string, @Body() updateSortDto: UpdateSortDto) {
    return this.sortService.update(id, updateSortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sortService.remove(id);
  }
}
