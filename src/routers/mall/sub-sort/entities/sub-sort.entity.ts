import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Sort } from '../../sort/entities/sort.entity';

@Entity()
export class SubSort {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: '子分类名必须是 String 类型' })
  @IsNotEmpty({ message: '子分类名不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Sort, (sort) => sort.subSorts)
  sort: Sort;

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
