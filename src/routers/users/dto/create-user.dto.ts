import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
export class CreateUserDto extends User {
  @ApiProperty()
  readonly captcha: string;
}
