import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleResType } from 'src/types/global';
import { getConnection, Repository } from 'typeorm';
import { ProductSpec } from '../product-specs/entities/product-spec.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductVal, UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productModel: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<RuleResType<any>> {
    const {
      name,
      sub_title,
      desc,
      order,
      is_shelf,
      is_new,
      is_recommend,
      serve,
      detail_title,
      detail_desc,
      key_word,
      remark,
      params,
      detail_banner,
      detail_img,
      product_specs,
    } = createProductDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      for (let i = 0; i < product_specs.length; i++) {
        const eObj = await queryRunner.manager
          .createQueryBuilder(ProductSpec, 'product_specs')
          .where('product_specs.id = :id', { id: product_specs[i] })
          .getOne();

        if (!eObj) throw new BadRequestException('id不存在');
        list.push(eObj);
      }
      const data = await queryRunner.manager.save(
        new Product({
          name,
          sub_title,
          desc,
          order,
          is_shelf,
          is_new,
          is_recommend,
          serve,
          detail_title,
          detail_desc,
          key_word,
          remark,
          params,
          detail_banner,
          detail_img,
          product_specs: list,
        }),
      );
      await await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findAll(params: QueryProductVal): Promise<RuleResType<any>> {
    const {
      current = 1,
      pageSize = 10,
      name,
      startTime,
      endTime,
      order,
    } = params;
    let data = this.productModel
      .createQueryBuilder()
      .leftJoinAndSelect('Product.product_specs', 'product_specs')
      .where({});
    if (name) {
      data = data.andWhere('Product.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (startTime && endTime) {
      data = data.andWhere('Product.createTime BETWEEN :start AND :end', {
        start: startTime,
        end: endTime,
      });
    }

    // 'descend' | 'ascend'
    if (order) {
      data = data.orderBy({
        'Product.order': order === 'descend' ? 'DESC' : 'ASC',
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
    const data = await this.productModel
      .createQueryBuilder()
      .leftJoinAndSelect('Product.product_specs', 'product_specs')
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
    updateProductSpecDto: UpdateProductDto,
  ): Promise<RuleResType<any>> {
    const {
      name,
      sub_title,
      desc,
      order,
      is_shelf,
      is_new,
      is_recommend,
      serve,
      detail_title,
      detail_desc,
      key_word,
      remark,
      params,
      detail_banner,
      detail_img,
      product_specs,
    } = updateProductSpecDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      if (product_specs) {
        for (let i = 0; i < product_specs.length; i++) {
          const eObj = await queryRunner.manager
            .createQueryBuilder(ProductSpec, 'product_specs')
            .where('product_specs.id = :id', { id: product_specs[i] })
            .getOne();
          if (!eObj) throw new BadRequestException('id不存在');
          list.push(eObj);
        }
      }
      const upEntity = new Product({
        id: +id,
        name,
        sub_title,
        desc,
        order,
        is_shelf,
        is_new,
        is_recommend,
        serve,
        detail_title,
        detail_desc,
        key_word,
        remark,
        params,
        detail_banner,
        detail_img,
        product_specs: list,
      });

      const data = await queryRunner.manager.save(upEntity);
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
        .from(Product)
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
