import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';
import { Category } from '../../category/entities/category.entity';
import { ProductSpec } from '../../product-specs/entities/product-spec.entity';

@Entity('mall_product')
export class Product extends Common {
  constructor(
    name?: any,
    sub_title?: any,
    desc?: any,
    order?: any,
    is_shelf?: any,
    is_new?: any,
    is_recommend?: any,
    serve?: any,
    detail_title?: any,
    detail_desc?: any,
    key_word?: any,
    remark?: any,
    params?: any,
    detail_banner?: any,
    detail_img?: any,
    product_specs?: any,
  ) {
    super();
    this.name = name;
    this.sub_title = sub_title;
    this.desc = desc;
    this.order = order;
    this.is_shelf = is_shelf;
    this.is_new = is_new;
    this.is_recommend = is_recommend;
    this.serve = serve;
    this.detail_title = detail_title;
    this.detail_desc = detail_desc;
    this.key_word = key_word;
    this.remark = remark;
    this.params = params;
    this.detail_banner = detail_banner;
    this.detail_img = detail_img;
    this.product_specs = product_specs;
  }

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

  @IsObject({ message: 'serve必须是 obj 类型' })
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
  @ManyToOne(() => Category, { createForeignKeyConstraints: false })
  category: Category;

  @ApiProperty()
  @ManyToOne(() => Brand, { createForeignKeyConstraints: false })
  brand: Brand;
}
