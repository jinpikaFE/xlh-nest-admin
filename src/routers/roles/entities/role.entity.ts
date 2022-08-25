import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Compon } from 'src/routers/compon/entities/compon.entity';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Role extends Common {
  @IsString({ message: '角色名必须是 String 类型' })
  @IsNotEmpty({ message: '角色不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsString({ message: '角色描述必须是 String 类型' })
  @IsNotEmpty({ message: '角色描述不能为空' })
  @ApiProperty()
  @Column()
  desc: string;

  @IsNotEmpty({ message: '组件不能为空' })
  @ApiProperty()
  @ManyToMany(() => Compon)
  @JoinTable()
  compon: Compon[];

  @ApiProperty()
  @ManyToMany(() => Compon)
  @JoinTable()
  half_compon: Compon[];

  @Column({ default: false })
  is_super: boolean;
}
