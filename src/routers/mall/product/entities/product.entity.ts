import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';
import { Category } from '../../category/entities/category.entity';
import { ProductSpec } from '../../product-specs/entities/product-spec.entity';

@Entity('mall_product')
export class Product extends Common {
  @IsString({ message: 'name必须是 String 类型' })
  @IsNotEmpty({ message: 'name不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsString({ message: 'sub_title必须是 String 类型' })
  @IsNotEmpty({ message: 'sub_title不能为空' })
  @ApiProperty()
  @Column()
  sub_title: string;

  @IsString({ message: 'desc必须是 String 类型' })
  @ApiProperty()
  @Column()
  desc: string;

  @IsInt({ message: 'order必须是 Int 类型' })
  @ApiProperty()
  @Column({ type: 'int' })
  order: number;

  @IsBoolean({ message: 'is_shelf 为Boolean类型' })
  @IsNotEmpty({ message: 'is_shelf 不能为空' })
  @ApiProperty()
  @Column()
  is_shelf: boolean;

  @IsBoolean({ message: 'is_newtui 为Boolean类型' })
  @IsNotEmpty({ message: 'is_new 不能为空' })
  @ApiProperty()
  @Column()
  is_new: boolean;

  @IsBoolean({ message: 'is_recommend 为Boolean类型' })
  @IsNotEmpty({ message: 'is_recommend 不能为空' })
  @ApiProperty()
  @Column()
  is_recommend: boolean;

  @IsArray({ message: 'serve必须是 Array 类型' })
  @ApiProperty()
  @Column({
    type: 'simple-array',
    comment: '服务保证 无忧退货，快速退货，免费包邮',
  })
  serve: string[];

  @IsString({ message: 'detail_title 必须是 String 类型' })
  @IsNotEmpty({ message: 'detail_title 不能为空' })
  @ApiProperty()
  @Column({ comment: '详情页标题' })
  detail_title: string;

  @IsString({ message: 'detail_desc 必须是 String 类型' })
  @IsNotEmpty({ message: 'detail_desc 不能为空' })
  @ApiProperty()
  @Column({ comment: '详情页描述' })
  detail_desc: string;

  @IsString({ message: 'key_word 必须是 String 类型' })
  @ApiProperty()
  @Column()
  key_word: string;

  @IsString({ message: 'remark 必须是 String 类型' })
  @ApiProperty()
  @Column()
  remark: string;

  @IsJSON({ message: 'serve必须是 JSON 类型' })
  @ApiProperty()
  @Column({
    type: 'simple-json',
    comment: '商品参数 ',
  })
  params: Record<string, any>;

  @IsArray({ message: 'detail_banner必须是 Array 类型' })
  @ApiProperty()
  @Column({
    type: 'simple-array',
    comment: '商品相册',
  })
  detail_banner: string[];

  @IsString({ message: 'detail_img 必须是 String 类型' })
  @ApiProperty()
  @Column()
  detail_img: string;

  @ApiProperty()
  @OneToMany(() => ProductSpec, (product_specs) => product_specs.product)
  product_specs: ProductSpec[];

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ApiProperty()
  @ManyToOne(() => Brand, (brand) => brand.product)
  brand: Brand;
}
