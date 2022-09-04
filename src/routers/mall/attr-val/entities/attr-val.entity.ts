import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AttrKey } from '../../attr-key/entities/attr-key.entity';

@Entity('mall_attr_val')
export class AttrVal extends Common {
  @IsString({ message: 'name必须是 String 类型' })
  @IsNotEmpty({ message: 'name不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsInt({ message: '必须是 Int 类型' })
  @ApiProperty()
  @Column({ type: 'int' })
  order: number;

  @ApiProperty()
  @ManyToOne(() => AttrKey, (attrKey) => attrKey.attr_val) // 将另一面指定为第二个参数
  attr_key: AttrKey;
}
