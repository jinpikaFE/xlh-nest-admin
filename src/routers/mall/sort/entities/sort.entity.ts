import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SubSort } from '../../sub-sort/entities/sub-sort.entity';

@Entity()
export class Sort {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: '分类名必须是 String 类型' })
  @IsNotEmpty({ message: '分类名不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @OneToMany(() => SubSort, (sub_sort) => sub_sort.sort)
  subSorts: SubSort[];

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'update_time',
    comment: '更新时间',
  })
  updateTime: Date;
}
