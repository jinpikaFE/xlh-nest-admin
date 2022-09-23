import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleResType } from 'src/types/global';
import { getConnection, Repository } from 'typeorm';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import {
  QueryProductSpecsVal,
  UpdateProductSpecDto,
} from './dto/update-product-spec.dto';
import { ProductSpec } from './entities/product-spec.entity';

@Injectable()
export class ProductSpecsService {
  constructor(
    @InjectRepository(ProductSpec)
    private readonly productSpecModel: Repository<ProductSpec>,
  ) {}

  async create(
    createProductSpecDto: CreateProductSpecDto,
  ): Promise<RuleResType<any>> {
    const { name, price, article_num, stock, unit, img, sku } =
      createProductSpecDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(ProductSpec)
        .values({
          name,
          price,
          article_num,
          stock,
          unit,
          img,
          sku,
        })
        .execute();
      await await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findAll(params: QueryProductSpecsVal): Promise<RuleResType<any>> {
    const { current = 1, pageSize = 10, name, startTime, endTime } = params;
    let data = this.productSpecModel.createQueryBuilder().where({});
    if (name) {
      data = data.andWhere('ProductSpec.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (startTime && endTime) {
      data = data.andWhere('createTime BETWEEN :start AND :end', {
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

  async findOne(id: string): Promise<RuleResType<any>> {
    const data = await this.productSpecModel
      .createQueryBuilder()
      .where({ id })
      .getOne();

    return {
      code: 200,
      message: '查询成功',
      data,
    };
  }

  async update(
    id: string,
    updateProductSpecDto: UpdateProductSpecDto,
  ): Promise<RuleResType<any>> {
    const { name, price, article_num, stock, unit, img, sku } =
      updateProductSpecDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await queryRunner.manager
        .createQueryBuilder()
        .update(ProductSpec)
        .set({
          name,
          price,
          article_num,
          stock,
          unit,
          img,
          sku,
        })
        .where('id = :id', { id })
        .execute();
      await await queryRunner.commitTransaction();
      return { code: 200, message: '更新成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async remove(id: string): Promise<RuleResType<any>> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(ProductSpec)
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
