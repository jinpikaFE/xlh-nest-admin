import { PartialType } from '@nestjs/swagger';
import { CreateSubSortDto } from './create-sub-sort.dto';

export class UpdateSubSortDto extends PartialType(CreateSubSortDto) {}
