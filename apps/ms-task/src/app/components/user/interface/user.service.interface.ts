import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

export interface UserServiceInterface {
  create(userDto: CreateUserDto): Promise<User>;
}
