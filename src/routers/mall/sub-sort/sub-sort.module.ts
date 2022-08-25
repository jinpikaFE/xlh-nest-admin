import { Module } from '@nestjs/common';
import { SubSortService } from './sub-sort.service';
import { SubSortController } from './sub-sort.controller';
import { SubSort } from './entities/sub-sort.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from '../goods/entities/good.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubSort]),
    TypeOrmModule.forFeature([Good]),
  ],
  controllers: [SubSortController],
  providers: [SubSortService],
})
export class SubSortModule {}
