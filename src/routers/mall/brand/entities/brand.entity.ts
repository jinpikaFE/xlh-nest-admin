import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Common } from 'src/entities/common.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('mall_brand')
export class Brand extends Common {
  constructor(obj: Partial<Brand>) {
    super();
    this.name = obj?.name;
    this.logo = obj?.logo;
    this.product = obj?.product;
  }

  @IsString({ message: 'name 必须是 String 类型' })
  @IsNotEmpty({ message: 'name 不能为空' })
  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  name: string;

  @IsString({ message: 'logo 必须是 String 类型' })
  @IsNotEmpty({ message: 'logo 不能为空' })
  @ApiProperty()
  @Column()
  logo: string;

  @ApiProperty()
  @OneToMany(() => Product, (product) => product.brand)
  product: Product[];
}
