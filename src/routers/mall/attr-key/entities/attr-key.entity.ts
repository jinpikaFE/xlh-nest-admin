import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AttrVal } from '../../attr-val/entities/attr-val.entity';
import { Category } from '../../category/entities/category.entity';

@Entity('mall_attr_key')
export class AttrKey extends Common {
  @IsString({ message: 'name必须是 String 类型' })
  @IsNotEmpty({ message: 'name不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsBoolean({ message: 'is_filter为Boolean类型' })
  @IsNotEmpty({ message: 'is_filter不能为空' })
  @ApiProperty()
  @Column()
  is_filter: boolean;

  @IsBoolean({ message: 'is_sku为Boolean类型' })
  @IsNotEmpty({ message: 'is_sku不能为空' })
  @ApiProperty()
  @Column()
  is_sku: boolean;

  @IsInt({ message: '必须是 Int 类型' })
  @ApiProperty()
  @Column({ type: 'int' })
  order: number;

  @ApiProperty()
  @ManyToOne(() => Category, { createForeignKeyConstraints: false }) // 将另一面指定为第二个参数
  category: Category;

  @ApiProperty()
  @OneToMany(() => AttrVal, (attrVal) => attrVal.attr_key)
  attr_val: AttrVal[];
}
