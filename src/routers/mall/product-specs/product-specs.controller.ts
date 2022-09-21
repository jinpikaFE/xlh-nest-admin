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
import { ProductSpecsService } from './product-specs.service';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import {
  QueryProductSpecsVal,
  UpdateProductSpecDto,
} from './dto/update-product-spec.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/token.guard';
import { MyValidationPipe } from 'src/pipe/validation.pipe';

@ApiTags('mall/product-specs')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RbacGuard)
@Controller('api/mall/product-specs')
export class ProductSpecsController {
  constructor(private readonly productSpecsService: ProductSpecsService) {}

  @UsePipes(new MyValidationPipe())
  @Post()
  @ApiBody({ type: CreateProductSpecDto })
  create(@Body() createProductSpecDto: CreateProductSpecDto) {
    return this.productSpecsService.create(createProductSpecDto);
  }

  @Get()
  findAll(@Query() Query: QueryProductSpecsVal) {
    return this.productSpecsService.findAll(Query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSpecsService.findOne(id);
  }

  @UsePipes(new MyValidationPipe())
  @Patch(':id')
  @ApiBody({ type: UpdateProductSpecDto })
  update(
    @Param('id') id: string,
    @Body() updateProductSpecDto: UpdateProductSpecDto,
  ) {
    return this.productSpecsService.update(id, updateProductSpecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSpecsService.remove(id);
  }
}
