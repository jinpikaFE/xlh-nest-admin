import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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

  @ManyToOne(() => SubSort, (subSort) => subSort.goods)
  subSort: SubSort;
}
