import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleResType } from 'src/types/global';
import { getConnection, Repository } from 'typeorm';
import { AttrKey } from '../attr-key/entities/attr-key.entity';
import { Product } from '../product/entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoryVal, UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryModel: Repository<Category>,
  ) {}

  async create(createDto: CreateCategoryDto): Promise<RuleResType<any>> {
    const {
      name,
      is_show,
      icon,
      key_word,
      banner,
      desc,
      order,
      pId,
      attr_key,
      product,
    } = createDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      if (attr_key) {
        for (let i = 0; i < attr_key.length; i++) {
          const eObj = await queryRunner.manager
            .createQueryBuilder(AttrKey, 'attr_key')
            .where('attr_key.id = :id', { id: attr_key[i] })
            .getOne();

          if (!eObj) throw new BadRequestException('attr_key id不存在');
          list.push(eObj);
        }
      }
      const list2 = [];
      if (product) {
        for (let i = 0; i < product.length; i++) {
          const eObj = await queryRunner.manager
            .createQueryBuilder(Product, 'product')
            .where('product.id = :id', { id: product[i] })
            .getOne();

          if (!eObj) throw new BadRequestException('product id不存在');
          list2.push(eObj);
        }
      }
      const data = await queryRunner.manager.save(
        new Category({
          name,
          is_show,
          key_word,
          icon,
          banner,
          desc,
          order,
          pId,
          attr_key: list,
          product: list2,
        }),
      );
      await await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findAll(params: QueryCategoryVal): Promise<RuleResType<any>> {
    const {
      current = 1,
      pageSize = 10,
      name,
      startTime,
      endTime,
      order,
    } = params;
    let data = this.categoryModel
      .createQueryBuilder()
      .leftJoinAndSelect('Category.attr_key', 'attr_key')
      .leftJoinAndSelect('Category.product', 'product')
      .leftJoinAndSelect('Category.p', 'p')
      .select(['Category', 'attr_key', 'product', 'p.id', 'p.name'])
      .where({});
    if (name) {
      data = data.andWhere('Category.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (startTime && endTime) {
      data = data.andWhere('Category.createTime BETWEEN :start AND :end', {
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
    const data = await this.categoryModel
      .createQueryBuilder()
      .leftJoinAndSelect('Category.attr_key', 'attr_key')
      .leftJoinAndSelect('Category.product', 'product')
      .select(['Category', 'attr_key', 'product', 'p.id', 'p.name'])
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
    updateDto: UpdateCategoryDto,
  ): Promise<RuleResType<any>> {
    const {
      name,
      is_show,
      icon,
      key_word,
      banner,
      desc,
      order,
      pId,
      attr_key,
      product,
    } = updateDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      if (attr_key) {
        for (let i = 0; i < attr_key.length; i++) {
          const eObj = await queryRunner.manager
            .createQueryBuilder(AttrKey, 'attr_key')
            .where('attr_key.id = :id', { id: attr_key[i] })
            .getOne();

          if (!eObj) throw new BadRequestException('attr_key id不存在');
          list.push(eObj);
        }
      }
      const list2 = [];
      if (product) {
        for (let i = 0; i < product.length; i++) {
          const eObj = await queryRunner.manager
            .createQueryBuilder(Product, 'product')
            .where('product.id = :id', { id: product[i] })
            .getOne();

          if (!eObj) throw new BadRequestException('product id不存在');
          list2.push(eObj);
        }
      }
      const upEntity = new Category({
        id: +id,
        name,
        is_show,
        key_word,
        icon,
        banner,
        desc,
        order,
        pId,
        attr_key: list,
        product: list2,
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
        .from(Category)
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
