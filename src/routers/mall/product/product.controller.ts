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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductVal, UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/token.guard';
import { MyValidationPipe } from 'src/pipe/validation.pipe';

@ApiTags('mall/product')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RbacGuard)
@Controller('api/mall/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new MyValidationPipe())
  @Post()
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() Query: QueryProductVal) {
    return this.productService.findAll(Query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UsePipes(new MyValidationPipe())
  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
