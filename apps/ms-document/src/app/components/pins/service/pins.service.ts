import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PinsTypeEntity from '../../../entities/pins.entity';
import { FileErrorTypeEnum } from '../../../enum/file-error-type.enum';
import FileCustomError from '../../../exceptions/fileCustomError.exception';
import { PinsInputDto } from '../dto/input/pins.input.dto';
import { PinsUpdateInputDto } from '../dto/input/pins.upate.input.dto';
import PinsFilterParams from '../dto/input/pinsFilter.input';
import { PinsShiftUpdateInputDto } from '../dto/input/pinsShift.update.input.dto';
import { PinsStatusUpdateInputDto } from '../dto/input/pinsStatus.upate.input.dto';
import { PinsTaskInfoUpdateInputDto } from '../dto/input/pinsTaskInfo.update.input.dto';

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
        throw new FileCustomError(FileErrorTypeEnum.PINS_NOT_FOUND)
    }

    async updatePins(refFilter: PinsFilterParams, pinsDetails: PinsUpdateInputDto) {

        const pins = await this.referancesRepository.findOne({ where: { ...refFilter } });
        if (pins) {
            await this.referancesRepository.update(pins.id, { ...pinsDetails });
            const updatedPost = await this.referancesRepository.find({ where: { ...refFilter } });
            return updatedPost;
        }
        throw new FileCustomError(FileErrorTypeEnum.PINS_NOT_FOUND)

    }

    async deletePins(refFilter: PinsFilterParams) {
        const { id } = await this.referancesRepository.findOne({ where: { ...refFilter } });
        const deleteResponse = await this.referancesRepository.delete(id);
        if (deleteResponse) {
            return deleteResponse;
        }
        throw new FileCustomError(FileErrorTypeEnum.PINS_NOT_FOUND)

    }

    async updatePinStatus(refFilter: PinsFilterParams, pinsStatusInput: PinsStatusUpdateInputDto) {
        const pinDetail = await this.referancesRepository.findOne({ where: { ...refFilter } });
        if (pinDetail) {
            await this.referancesRepository.update(pinDetail.id, { ...pinsStatusInput });
            const updatedPinDetail = await this.referancesRepository.find({ where: { ...refFilter } });
            return updatedPinDetail;
        }
        throw new FileCustomError(FileErrorTypeEnum.PINS_NOT_FOUND)
    }

    async shiftActivePinsToNewVersion(refFilter: PinsFilterParams, pinsShiftInput: PinsShiftUpdateInputDto) {

        const activePins = await this.referancesRepository.find({ where: { ...refFilter, status: 'INPROGRESS', isDeleted: false } });
        if (activePins) {
            let updatedPinIds = []
            for (let i = 0; i < activePins.length; i++) {
                // Update to new version file
                await this.referancesRepository.update(activePins[i].id, { ...pinsShiftInput });
                updatedPinIds.push(activePins[i].id)                
            }

            if (!updatedPinIds?.length) {
                throw new FileCustomError(FileErrorTypeEnum.INTERNAL_SERVER_ERROR)
            }
            const updatedPins = await this.referancesRepository.find({ where: { id: [updatedPinIds] } });
            return updatedPins;
        }
        // throw new FileCustomError(FileErrorTypeEnum.PINS_NOT_FOUND)
    }

    async updateTaskReferenceInPinDetail(refFilter: PinsFilterParams, pinsTaskInfoUpdateInput: PinsTaskInfoUpdateInputDto) {
        const pinDetail = await this.referancesRepository.findOne({ where: { ...refFilter } });
        if (pinDetail) {
            await this.referancesRepository.update(pinDetail.id, { ...pinsTaskInfoUpdateInput });
            const updatedPinDetail = await this.referancesRepository.find({ where: { ...refFilter } });
            return updatedPinDetail;
        }
        throw new FileCustomError(FileErrorTypeEnum.PINS_NOT_FOUND)
    }
}