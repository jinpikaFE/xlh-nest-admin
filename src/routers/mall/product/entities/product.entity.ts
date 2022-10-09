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
  constructor(obj: Partial<Product>) {
    super();
    this.id = obj?.id;
    this.name = obj?.name;
    this.sub_title = obj?.sub_title;
    this.desc = obj?.desc;
    this.order = obj?.order;
    this.is_shelf = obj?.is_shelf;
    this.is_new = obj?.is_new;
    this.is_recommend = obj?.is_recommend;
    this.serve = obj?.serve;
    this.detail_title = obj?.detail_title;
    this.detail_desc = obj?.detail_desc;
    this.key_word = obj?.key_word;
    this.remark = obj?.remark;
    this.params = obj?.params;
    this.detail_banner = obj?.detail_banner;
    this.detail_img = obj?.detail_img;
    this.product_specs = obj?.product_specs;
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
