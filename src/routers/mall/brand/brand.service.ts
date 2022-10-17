import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleResType } from 'src/types/global';
import { getConnection, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { QueryBrandVal, UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandModel: Repository<Brand>,
  ) {}

  async create(createDto: CreateBrandDto): Promise<RuleResType<any>> {
    const { name, logo, product } = createDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      if (product) {
        for (let i = 0; i < product.length; i++) {
          const eObj = await queryRunner.manager
            .createQueryBuilder(Product, 'product')
            .where('product.id = :id', { id: product[i] })
            .getOne();

          if (!eObj) throw new BadRequestException('product id不存在');
          list.push(eObj);
        }
      }

      const data = await queryRunner.manager.save(
        new Brand({
          name,
          logo,
          product: list,
        }),
      );
      await await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findAll(params: QueryBrandVal): Promise<RuleResType<any>> {
    const { current = 1, pageSize = 10, name, startTime, endTime } = params;
    let data = this.brandModel
      .createQueryBuilder()
      .leftJoinAndSelect('Brand.product', 'product')
      .where({});
    if (name) {
      data = data.andWhere('Brand.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (startTime && endTime) {
      data = data.andWhere('Brand.createTime BETWEEN :start AND :end', {
        start: startTime,
        end: endTime,
      });
    }

    data = data
      .skip((Number(current) - 1) * Number(pageSize))
      .take(Number(pageSize));
    return {
      code: 200,
      message: '查询成功',
      data: await data.getMany(),
      total: await data.getCount(),
    };
  }

  async findOne(id: number): Promise<RuleResType<any>> {
    const data = await this.brandModel
      .createQueryBuilder()
      .leftJoinAndSelect('Brand.product', 'product')
      .where({ id })
      .getOne();

    return {
      code: 200,
      message: '查询成功',
      data,
    };
  }

  async update(
    id: number,
    updateDto: UpdateBrandDto,
  ): Promise<RuleResType<any>> {
    const { name, logo, product } = updateDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      if (product) {
        for (let i = 0; i < product.length; i++) {
          const eObj = await queryRunner.manager
            .createQueryBuilder(Product, 'product')
            .where('product.id = :id', { id: product[i] })
            .getOne();

          if (!eObj) throw new BadRequestException('product id不存在');
          list.push(eObj);
        }
      }
      const upEntity = new Brand({
        id,
        name,
        logo,
        product: list,
      });

      const data = await queryRunner.manager.save(upEntity);
      await await queryRunner.commitTransaction();
      return { code: 200, message: '更新成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async remove(id: number): Promise<RuleResType<any>> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Brand)
        .where('id=:id', { id })
        .execute();
      await await queryRunner.commitTransaction();
      return { code: 200, message: '删除成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }
}
