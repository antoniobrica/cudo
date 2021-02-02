import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../components/user/entity/user.entity';
import { UserRepositoryInterface } from '../../../components/user/interface/user.repository.interface';
import { BaseAbstractRepository } from '../base-abstract-repository';

@Injectable()
export class UserRepositoryService
  extends BaseAbstractRepository<User>
  implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
    super(usersRepository);
  }
}
