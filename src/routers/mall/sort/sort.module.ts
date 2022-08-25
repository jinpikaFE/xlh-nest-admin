import { Module } from '@nestjs/common';
import { SortService } from './sort.service';
import { SortController } from './sort.controller';
import { Sort } from './entities/sort.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSort } from '../sub-sort/entities/sub-sort.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sort]),
    TypeOrmModule.forFeature([SubSort]),
  ],
  controllers: [SortController],
  providers: [SortService],
})
export class SortModule {}
