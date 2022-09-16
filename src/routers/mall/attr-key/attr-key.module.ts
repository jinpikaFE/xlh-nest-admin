import { Module } from '@nestjs/common';
import { AttrKeyService } from './attr-key.service';
import { AttrKeyController } from './attr-key.controller';
import { AttrKey } from './entities/attr-key.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttrVal } from '../attr-val/entities/attr-val.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttrKey, AttrVal])],
  controllers: [AttrKeyController],
  providers: [AttrKeyService],
})
export class AttrKeyModule {}
