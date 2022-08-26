import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { SubSort } from '../../sub-sort/entities/sub-sort.entity';

@Entity('mall-good')
export class Good extends Common {
  @IsString({ message: '商品名必须是 String 类型' })
  @IsNotEmpty({ message: '商品名不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsString({ message: '商品描述必须是 String 类型' })
  @IsNotEmpty({ message: '商品描述不能为空' })
  @ApiProperty()
  @Column({ comment: '商品描述' })
  desc: string;

  @IsNumber({}, { message: '商品价格必须是 Number 类型' })
  @IsNotEmpty({ message: '商品价格不能为空' })
  @ApiProperty()
  @Column({ comment: '商品价格' })
  pirce: number;

  @ApiProperty()
  @Column({ type: 'simple-array', comment: '轮播图图片数组' })
  bannerImg: string[];

  @ApiProperty()
  @Column({ type: 'simple-array', comment: '详情图片数组' })
  detailImg: string[];

  @ManyToOne(() => SubSort, (subSort) => subSort.goods)
  subSort: SubSort;
}
