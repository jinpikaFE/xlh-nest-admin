import { Module } from '@nestjs/common';
import { ProductSpecsService } from './product-specs.service';
import { ProductSpecsController } from './product-specs.controller';
import { ProductSpec } from './entities/product-spec.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpec])],
  controllers: [ProductSpecsController],
  providers: [ProductSpecsService],
})
export class ProductSpecsModule {}
