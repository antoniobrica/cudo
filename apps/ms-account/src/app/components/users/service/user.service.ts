import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import UsersEntity from '../../../entities/users.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { UserFilterArgs } from '../dto/args/user-filter.args';
import { UserInputDto } from '../dto/input/user.input.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
        private referenceService: ReferenceService,
    ) { }

    async createUser(userDetails: UserInputDto, refFilter: ReferenceFilterParams) {
        const selectedReference = await this.referenceService.getReferenceById(refFilter);
        const newUser = new UsersEntity({ ...userDetails });
        newUser.references = [selectedReference];
        const newReferance = await this.userRepository.create(newUser);
        await this.userRepository.save(newReferance);
        return newReferance;
    }

    async getUser(userFilterArgs?: UserFilterArgs) {
        const result = await this.userRepository.find({ where: { ...userFilterArgs }, relations: ['references'] });
        console.log(JSON.stringify(result));
        return result;
    }
}