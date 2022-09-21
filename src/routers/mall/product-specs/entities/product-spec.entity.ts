import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('mall_product_spec')
export class ProductSpec extends Common {
  @IsString({ message: 'name 必须是 String 类型' })
  @IsNotEmpty({ message: 'name 不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsNumber({ allowInfinity: true }, { message: 'price 必须是 Number 类型' })
  @IsNotEmpty({ message: 'price 不能为空' })
  @ApiProperty()
  @Column({ type: 'float', comment: '售价' })
  price: number;

  @IsString({ message: 'article_num 必须是 String 类型' })
  @IsNotEmpty({ message: 'article_num 不能为空' })
  @ApiProperty()
  @Column({ comment: '货号' })
  article_num: string;

  @IsInt({ message: 'stock 必须是 Int 类型' })
  @IsNotEmpty({ message: 'stock 不能为空' })
  @ApiProperty()
  @Column({ type: 'int', comment: '库存' })
  stock: number;

  @IsString({ message: 'unit 必须是 String 类型' })
  @IsNotEmpty({ message: 'unit 不能为空' })
  @ApiProperty()
  @Column({ comment: '单位' })
  unit: string;

  @IsString({ message: 'img 必须是 String 类型' })
  @IsNotEmpty({ message: 'img 不能为空' })
  @ApiProperty()
  @Column({ comment: '详情页标题' })
  img: string;

  @IsObject({ message: 'sku 必须是 obj 类型' })
  @ApiProperty()
  @Column({
    type: 'simple-json',
    comment: 'sku',
  })
  sku: Record<string, any>;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.product_specs)
  product: Product;
}
