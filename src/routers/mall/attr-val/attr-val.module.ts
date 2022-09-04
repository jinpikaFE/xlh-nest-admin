import { Module } from '@nestjs/common';
import { AttrValService } from './attr-val.service';
import { AttrValController } from './attr-val.controller';
import { AttrVal } from './entities/attr-val.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AttrVal])],
  controllers: [AttrValController],
  providers: [AttrValService],
})
export class AttrValModule {}
