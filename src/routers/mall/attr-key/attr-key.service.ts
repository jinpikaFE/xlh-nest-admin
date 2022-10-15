import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleResType } from 'src/types/global';
import { getConnection, Repository } from 'typeorm';
import { AttrVal } from '../attr-val/entities/attr-val.entity';
import { CreateAttrKeyDto } from './dto/create-attr-key.dto';
import { QueryAttrKey, UpdateAttrKeyDto } from './dto/update-attr-key.dto';
import { AttrKey } from './entities/attr-key.entity';

@Injectable()
export class AttrKeyService {
  constructor(
    @InjectRepository(AttrVal)
    private readonly attrValModel: Repository<AttrVal>,
    @InjectRepository(AttrKey)
    private readonly attrKeyModel: Repository<AttrKey>,
  ) {}

  async create(createDto: CreateAttrKeyDto): Promise<RuleResType<any>> {
    const { name, is_filter, is_sku, order, attr_val } = createDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      for (let i = 0; i < attr_val.length; i++) {
        const eObj = await this.attrValModel
          .createQueryBuilder()
          .where({ id: attr_val[i] })
          .getOne();

        if (!eObj) throw new BadRequestException('id不存在');
        list.push(eObj);
      }
      const data = await this.attrKeyModel.save({
        name,
        is_filter,
        is_sku,
        order,
        attr_val: list,
      });
      await await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findAll(params: QueryAttrKey): Promise<RuleResType<any>> {
    const {
      current = 1,
      pageSize = 10,
      name,
      is_filter,
      is_sku,
      order,
      startTime,
      endTime,
    } = params;
    let data = this.attrKeyModel
      .createQueryBuilder()
      /** 第一个是关系， 第二个是表别名 */
      .leftJoinAndSelect('AttrKey.attr_val', 'attr_val')
      .where({});
    if (name) {
      data = data.andWhere('AttrKey.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (is_filter) {
      data = data.andWhere({ is_filter });
    }

    if (is_sku) {
      data = data.andWhere({ is_sku });
    }

    if (startTime && endTime) {
      data = data.andWhere('AttrKey.createTime BETWEEN :start AND :end', {
        start: startTime,
        end: endTime,
      });
    }

    // 'descend' | 'ascend'
    if (order) {
      data = data.orderBy({
        'AttrKey.order': order === 'descend' ? 'DESC' : 'ASC',
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
    const data = await this.attrKeyModel
      .createQueryBuilder()
      .leftJoinAndSelect('AttrKey.attr_val', 'attr_val')
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
    updateDto: UpdateAttrKeyDto,
  ): Promise<RuleResType<any>> {
    const { name, is_filter, is_sku, order, attr_val } = updateDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const list = [];
      if (attr_val) {
        for (let i = 0; i < attr_val.length; i++) {
          const eObj = await this.attrValModel
            .createQueryBuilder()
            .where({ id: attr_val[i] })
            .getOne();
          if (!eObj) throw new BadRequestException('id不存在');
          list.push(eObj);
        }
      }
      const upEntity = new AttrKey();
      upEntity.id = +id;
      upEntity.name = name;
      upEntity.is_filter = is_filter;
      upEntity.is_sku = is_sku;
      upEntity.order = order;
      if (attr_val) {
        upEntity.attr_val = list;
      }

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
      const data = await this.attrKeyModel
        .createQueryBuilder()
        .delete()
        .where({ id })
        .execute();
      await await queryRunner.commitTransaction();
      return { code: 200, message: '删除成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }
}
