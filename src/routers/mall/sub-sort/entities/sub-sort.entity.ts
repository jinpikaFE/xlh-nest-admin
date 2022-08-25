import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Good } from '../../goods/entities/good.entity';
import { Sort } from '../../sort/entities/sort.entity';

@Entity('mall-sub-sort')
export class SubSort extends Common {
  @IsString({ message: '子分类名必须是 String 类型' })
  @IsNotEmpty({ message: '子分类名不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Sort, (sort) => sort.subSorts)
  sort: Sort;

  @ApiProperty()
  @OneToMany(() => Good, (good) => good.subSort)
  goods: Good[];
}
