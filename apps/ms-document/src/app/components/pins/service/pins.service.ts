import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import PinsTypeEntity from '../../../entities/pins.entity';
import { PinsInputDto } from '../dto/input/pins.input.dto';
import { PinsUpdateInputDto } from '../dto/input/pins.upate.input.dto';
import PinsFilterParams from '../dto/input/pinsFilter.input';
import PinsNotFoundException from '../exceptions/pinsNotFound.exception';

@Injectable()
export class PinsService {
    constructor(
        @InjectRepository(PinsTypeEntity)
        private referancesRepository: Repository<PinsTypeEntity>,
    ) { }

    async createPins(pinsDetails: PinsInputDto) {
        const newPins = await this.referancesRepository.create(new PinsTypeEntity({
            ...pinsDetails
        }));
        await this.referancesRepository.save(newPins);
        return newPins;
    }

    async getPinsById(refFilter: PinsFilterParams) {
        const pins = await this.referancesRepository.find({ where: { ...refFilter } });
        if (pins) {
            return pins;
        }
        throw new PinsNotFoundException(refFilter.fileID);
    }

    async updatePins(refFilter: PinsFilterParams, pinsDetails: PinsUpdateInputDto) {

        const pins = await this.referancesRepository.findOne({ where: { ...refFilter } });
        if (pins) {
            await this.referancesRepository.update(pins.id, { ...pinsDetails });
            const updatedPost = await this.referancesRepository.find({ where: { ...refFilter } });
            return updatedPost;
        }
        throw new PinsNotFoundException(refFilter.fileID);
    }

    async deletePins(refFilter: PinsFilterParams) {
        const { id } = await this.referancesRepository.findOne({ where: { ...refFilter } });
        const deleteResponse = await this.referancesRepository.delete(id);
        if (deleteResponse) {
            return deleteResponse;
        }
        throw new PinsNotFoundException(refFilter.fileID);
    }

}