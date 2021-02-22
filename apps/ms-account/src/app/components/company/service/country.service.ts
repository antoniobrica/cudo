import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import CountryEntity from '../../../entities/countries.entity';
import ReferenceFilterParams from '../../../utils/types/countryFilterParams';
import { ReferenceInputDto } from '../dto/input/country.input.dto';
import { ReferenceUpdateInputDto } from '../dto/input/country.upate.input.dto';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(CountryEntity)
        private countryRepository: Repository<CountryEntity>,
    ) { }

    async createReference(countryDetails: ReferenceInputDto) {
        const newReferance = await this.countryRepository.create(new CountryEntity({
            ...countryDetails
        }));
        await this.countryRepository.save(newReferance);
        return newReferance;
    }

    async getReference(offset?: number, limit?: number, startId?: number, options?: FindManyOptions<CountryEntity>) {
        const where: FindManyOptions<CountryEntity>['where'] = {};
        let separateCount = 0;
        if (startId) {
            where.id = MoreThan(startId);
            separateCount = await this.countryRepository.count();
        }
        const [items, count] = await this.countryRepository.findAndCount({
            where,
            order: {
                id: 'ASC'
            },
            skip: offset,
            take: limit,
            ...options
        });
        return {
            items,
            count: startId ? separateCount : count
        }
    }


    async getReferenceById() {
        const country = await this.countryRepository.find();
        if (country) {
            return country;
        }
    }

}