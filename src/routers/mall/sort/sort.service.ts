import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleResType } from 'src/types/global';
import { getConnection, Repository } from 'typeorm';
import { SubSort } from '../sub-sort/entities/sub-sort.entity';
import { CreateSortDto } from './dto/create-sort.dto';
import { UpdateSortDto } from './dto/update-sort.dto';
import { Sort } from './entities/sort.entity';

@Injectable()
export class SortService {
  constructor(
    @InjectRepository(Sort)
    private readonly sortModel: Repository<Sort>,
    @InjectRepository(SubSort)
    private readonly subSortModel: Repository<SubSort>,
  ) {}

  async create(createSortDto: CreateSortDto): Promise<RuleResType<any>> {
    const { name, subSorts } = createSortDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sortList = [];
      for (let i = 0; i < subSorts.length; i++) {
        const sortObj = await this.subSortModel
          .createQueryBuilder()
          .where({ id: subSorts[i] })
          .getOne();

        if (!sortObj) throw new BadRequestException('组件id不存在');
        sortList.push(sortObj);
      }
      const data = await this.sortModel.save({
        name,
        subSorts: sortList,
      });
      await await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async filterQuery(params): Promise<RuleResType<any>> {
    const { current = 1, pageSize = 10, name, startTime, endTime } = params;
    let data = this.sortModel
      .createQueryBuilder()
      /** 第一个是关系， 第二个是表别名 */
      .leftJoinAndSelect('Sort.subSorts', 'subSorts')
      .where({});
    if (name) {
      data = data.andWhere({ name });
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

  async findAll(): Promise<RuleResType<any>> {
    const data = await this.sortModel
      .createQueryBuilder()
      /** 第一个是关系， 第二个是表别名 */
      .leftJoinAndSelect('Sort.subSorts', 'subSorts')
      .getMany();
    return { code: 200, message: '查询成功', data };
  }

  async update(
    id: string,
    updateSortDto: UpdateSortDto,
  ): Promise<RuleResType<any>> {
    const { name, subSorts } = updateSortDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sortList = [];
      if (subSorts) {
        for (let i = 0; i < subSorts.length; i++) {
          const sortObj = await this.sortModel
            .createQueryBuilder()
            .where({ id: subSorts[i] })
            .getOne();
          if (!sortObj) throw new BadRequestException('组件id不存在');
          sortList.push(sortObj);
        }
      }
      const sortEntity = new Sort();
      sortEntity.id = +id;
      sortEntity.name = name;
      if (subSorts) {
        sortEntity.subSorts = sortList;
      }

      const data = await this.sortModel.save(sortEntity);
      await await queryRunner.commitTransaction();
      return { code: 200, message: '更新成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findOne(id: string): Promise<RuleResType<any>> {
    const data = await this.sortModel
      .createQueryBuilder()
      .leftJoinAndSelect('Sort.subSorts', 'subSorts')
      .select(['Sort', 'subSorts.id', 'subSorts.name'])
      .where({ id })
      .getOne();

    return {
      code: 200,
      message: '查询成功',
      data,
    };
  }

  async remove(id: string): Promise<RuleResType<any>> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await this.sortModel.delete(id);
      await await queryRunner.commitTransaction();
      return { code: 200, message: '删除成功', data };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }
}
