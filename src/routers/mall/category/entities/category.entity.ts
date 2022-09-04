import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AttrKey } from '../../attr-key/entities/attr-key.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('mall_category')
export class Category extends Common {
  @IsString({ message: 'name必须是 String 类型' })
  @IsNotEmpty({ message: 'name不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsBoolean({ message: 'is_show为Boolean类型' })
  @IsNotEmpty({ message: 'is_show不能为空' })
  @ApiProperty()
  @Column()
  is_show: boolean;

  @IsString({ message: 'icon必须是 String 类型' })
  @ApiProperty()
  @Column()
  icon: string;

  @IsArray({ message: 'banner必须是 Array 类型' })
  @ApiProperty()
  @Column({ type: 'simple-array', comment: '分类介绍轮播图' })
  banner: string[];

  @IsString({ message: 'key_word必须是 String 类型' })
  @ApiProperty()
  @Column()
  key_word: string;

  @IsString({ message: 'desc必须是 String 类型' })
  @ApiProperty()
  @Column()
  desc: string;

  @IsInt({ message: 'order必须是 Int 类型' })
  @ApiProperty()
  @Column({ type: 'int' })
  order: number;

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.p) // 父节点
  p: Category;

  @ApiProperty()
  @OneToMany(() => AttrKey, (attrKey) => attrKey.category)
  attr_key: AttrKey[];

  @ApiProperty()
  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
