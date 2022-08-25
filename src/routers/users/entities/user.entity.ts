import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Role } from 'src/routers/roles/entities/role.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User extends Common {
  @IsString({ message: '用户名必须是 String 类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true, nullable: true })
  username: string;

  @IsString({ message: '邮箱必须是 String 类型' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true, nullable: true })
  email: string;

  @IsString({ message: '手机号必须是 String 类型' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true, nullable: true })
  phone: string;

  // @IsString({ message: '角色id必须是 String 类型' })
  @IsNotEmpty({ message: '角色id不能为空' })
  @ApiProperty()
  @ManyToMany(() => Role)
  @JoinTable()
  role: Role[];

  @IsString({ message: '头像必须是 String 类型' })
  @IsNotEmpty({ message: '头像不能为空' })
  @ApiProperty()
  @Column({ nullable: true })
  avatar: string;

  @IsString({ message: '密码必须是 String 类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  salt: string;
}
