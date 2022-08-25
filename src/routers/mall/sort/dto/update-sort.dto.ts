import { PartialType } from '@nestjs/swagger';
import { CreateSortDto } from './create-sort.dto';

export class UpdateSortDto extends PartialType(CreateSortDto) {}
