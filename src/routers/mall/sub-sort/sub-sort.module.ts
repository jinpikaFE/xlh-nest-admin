import { Module } from '@nestjs/common';
import { SubSortService } from './sub-sort.service';
import { SubSortController } from './sub-sort.controller';
import { SubSort } from './entities/sub-sort.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubSort])],
  controllers: [SubSortController],
  providers: [SubSortService],
})
export class SubSortModule {}
