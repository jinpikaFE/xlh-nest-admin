import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisInstance } from 'src/providers/database/redis';
import { RuleResType } from 'src/types/global';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { getConnection, Not, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
    @InjectRepository(Role)
    private readonly roleModel: Repository<Role>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    authorization: string,
  ): Promise<RuleResType<any>> {
    const { username, password, email, phone, role, avatar, captcha } =
      createUserDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const salt = makeSalt(); // 制作密码盐
      const hashPwd = encryptPassword(password, salt); // 加密密码

      /** 非超管需要短信验证 */
      const token = authorization?.split?.(' ')?.[1]; // authorization: Bearer xxx
      const base64Payload = token?.split?.('.')?.[1];
      const payloadBuffer = Buffer.from(base64Payload, 'base64');
      const userinfo = JSON.parse(payloadBuffer.toString());
      const user = await queryRunner.manager
        .createQueryBuilder(User, 'User')
        .leftJoinAndSelect('User.role', 'role')
        .select(['User.id', 'role'])
        .where({ id: userinfo?.id })
        .getOne();
      if (!(user?.role && user?.role?.findIndex((u) => u?.is_super) !== -1)) {
        const redis = await RedisInstance.initRedis('captcha', 0);
        const cache = await redis.get(createUserDto?.phone);
        if (captcha !== cache) {
          return { code: -1, message: '短信验证码错误', data: null };
        }
      }

      const cUser = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username,
          password: hashPwd,
          salt,
          email,
          phone,
          avatar,
        })
        .execute();

      for (let i = 0; i < role.length; i++) {
        const roleObj = await queryRunner.manager
          .createQueryBuilder(Role, 'role')
          .where('role.id = :id', { id: role[i] })
          .getOne();
        if (!roleObj) throw new BadRequestException(`${role[i]} 角色id不存在`);
        await queryRunner.manager
          .createQueryBuilder()
          .relation(User, 'role')
          .of(cUser?.raw?.insertId)
          .add(role[i]);
      }
      await queryRunner.commitTransaction();
      return { code: 200, message: '创建成功', data: null };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async findOne(id: string): Promise<RuleResType<any>> {
    const data = await this.userModel
      .createQueryBuilder()
      .leftJoinAndSelect('User.role', 'role')
      .leftJoinAndSelect('role.compon', 'compon')
      .select([
        'User.id',
        'User.username',
        'User.email',
        'User.phone',
        'User.avatar',
        'User.createTime',
        'User.updateTime',
        'role',
        'compon.name',
      ])
      .where({ id })
      .getOne();

    return {
      code: 200,
      message: '查询成功',
      data,
    };
  }

  async findAll(params): Promise<RuleResType<any>> {
    const {
      current = 1,
      pageSize = 10,
      userName,
      role,
      email,
      phone,
      startTime,
      endTime,
    } = params;
    let data = this.userModel
      .createQueryBuilder()
      /** 第一个是关系， 第二个是表别名 */
      .leftJoinAndSelect('User.role', 'role')
      .leftJoinAndSelect('role.compon', 'compon')
      .select([
        'User.id',
        'User.username',
        'User.email',
        'User.phone',
        'User.avatar',
        'User.createTime',
        'User.updateTime',
        'role',
        'compon.name',
      ])
      .where('role.is_super = :roleIsSuper', {
        roleIsSuper: false,
      });
    if (userName) {
      data = data.andWhere({ userName });
    }
    if (email) {
      data = data.andWhere({ email });
    }
    if (phone) {
      data = data.andWhere({ phone });
    }
    if (email) {
      data = data.andWhere({ email });
    }
    if (role) {
      data = data.andWhere({ role });
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    authorization: string,
  ): Promise<RuleResType<any>> {
    const { username, email, phone, role, avatar, captcha } = updateUserDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      /** 非超管需要短信验证 */
      const token = authorization?.split?.(' ')?.[1]; // authorization: Bearer xxx
      const base64Payload = token?.split?.('.')?.[1];
      const payloadBuffer = Buffer.from(base64Payload, 'base64');
      const userinfo = JSON.parse(payloadBuffer.toString());
      const user = await queryRunner.manager
        .createQueryBuilder(User, 'User')
        .leftJoinAndSelect('User.role', 'role')
        .select(['User.id', 'role'])
        .where({ id: userinfo?.id })
        .getOne();
      if (!(user?.role && user?.role?.findIndex((u) => u?.is_super) !== -1)) {
        const redis = await RedisInstance.initRedis('captcha', 0);
        const cache = await redis.get(updateUserDto?.phone);
        if (captcha !== cache) {
          return { code: -1, message: '短信验证码错误', data: null };
        }
      }

      const roleList = [];
      if (role) {
        for (let i = 0; i < role.length; i++) {
          const roleObj = await queryRunner.manager
            .createQueryBuilder(Role, 'role')
            .where('role.id = :id', { id: role[i] })
            .getOne();
          if (!roleObj)
            throw new BadRequestException(`${role[i]} 角色id不存在`);
          roleList.push(roleObj);
        }
      }

      const userEntity = new User();
      userEntity.id = +id;
      userEntity.username = username;
      userEntity.email = email;
      userEntity.phone = phone;
      userEntity.avatar = avatar;
      if (role) {
        userEntity.role = roleList;
      }
      const data = await queryRunner.manager.save(userEntity);
      if (data) {
        await queryRunner.commitTransaction();
        return { code: 200, message: '更新成功', data };
      }
      await queryRunner.rollbackTransaction();
      return { code: -1, message: '更新失败', data: null };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e);
    }
  }

  async remove(id: string): Promise<RuleResType<any>> {
    const data = await this.userModel.delete(id);
    return { code: 200, message: '删除成功', data };
  }
}
