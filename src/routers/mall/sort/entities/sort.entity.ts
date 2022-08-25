import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { SubSort } from '../../sub-sort/entities/sub-sort.entity';

@Entity('mall-sort')
export class Sort extends Common {
  @IsString({ message: '分类名必须是 String 类型' })
  @IsNotEmpty({ message: '分类名不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @OneToMany(() => SubSort, (sub_sort) => sub_sort.sort)
  subSorts: SubSort[];
}
