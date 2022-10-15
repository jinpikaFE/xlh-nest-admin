import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleResType } from 'src/types/global';
import { getConnection, IsNull, Repository } from 'typeorm';
import { CreateAttrValDto } from './dto/create-attr-val.dto';
import { QueryAttrVal, UpdateAttrValDto } from './dto/update-attr-val.dto';
import { AttrVal } from './entities/attr-val.entity';

@Injectable()
export class AttrValService {
  constructor(
    @InjectRepository(AttrVal)
    private readonly attrValModel: Repository<AttrVal>,
  ) {}

  async create(createAttrValDto: CreateAttrValDto): Promise<RuleResType<any>> {
    const { name, order } = createAttrValDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await this.attrValModel.save({
        name,
        order,
      });
      await await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findAll(params: QueryAttrVal): Promise<RuleResType<any>> {
    const {
      current = 1,
      pageSize = 10,
      name,
      order,
      startTime,
      endTime,
      arr_key_id,
    } = params;
    let data = this.attrValModel.createQueryBuilder().where({});
    if (name) {
      data = data.andWhere('AttrVal.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (arr_key_id) {
      data = data.andWhere(
        'AttrVal.attrKeyId = :attrKeyId OR AttrVal.attrKeyId is NULL',
        {
          attrKeyId: arr_key_id,
        },
      );
    }

    if (startTime && endTime) {
      data = data.andWhere('AttrVal.createTime BETWEEN :start AND :end', {
        start: startTime,
        end: endTime,
      });
    }

    // 'descend' | 'ascend'
    if (order) {
      data = data.orderBy({
        'AttrVal.order': order === 'descend' ? 'DESC' : 'ASC',
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
    const data = await this.attrValModel
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
    updateAttrValDto: UpdateAttrValDto,
  ): Promise<RuleResType<any>> {
    const { name, order } = updateAttrValDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const upEntity = new AttrVal();
      upEntity.id = +id;
      upEntity.name = name;
      upEntity.order = order;
      // if (subSorts) {
      //   sortEntity.subSorts = sortList;
      // }

      const data = await this.attrValModel.save(upEntity);
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
      const data = await this.attrValModel.delete(id);
      await await queryRunner.commitTransaction();
      return { code: 200, message: '删除成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }
}
