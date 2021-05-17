import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import UsersEntity from '../../../entities/users.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { UserFilterArgs } from '../dto/args/user-filter.args';
import CompanyParams from '../dto/input/company.input.dto';
import { UserFilterInputDto } from '../dto/input/user.filter.input.dto';
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
        return result;
    }

    async addCompanyToUser(userDetails: UserFilterInputDto, referencesInputDto: CompanyParams[]): Promise<UsersEntity> {
        try {
            const { email } = userDetails;
            const fileDetail = await this.userRepository.findOne({ where: { email: userDetails.email }, relations: ['references'] });
            if (!fileDetail) {
                throw new HttpException('Project Not Found', HttpStatus.NOT_FOUND);
            }
            if (referencesInputDto) {
                for (let index = 0; index < referencesInputDto.length; index++) {
                    const fileParamentity = await this.referenceService.getOnlyReferenceById({ ...referencesInputDto[index] });
                    fileDetail.references.push(fileParamentity)
                }
            }
            await this.userRepository.save(fileDetail);
            const reference = await this.userRepository.findOne({ where: { email: userDetails.email }, relations: ['references'] });
            return reference;
        } catch (error) {
            return error;
        }
    }
}