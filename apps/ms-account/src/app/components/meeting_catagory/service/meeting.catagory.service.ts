import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeetingCatagoryEntity } from '../../../entities/meeting.catagory.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateMeetCatagoryInput } from '../dto/create-meeting-catagory.input';
import { UpdateMeetingCatagory } from '../dto/update-folder.input';
import CatagoryNotFoundException from '../exceptions/catagoryNotFound.exception';

@Injectable()
export class MeetingCatagoryService {
  constructor(
    @InjectRepository(MeetingCatagoryEntity)
    private meetingCatagoryRepository: Repository<MeetingCatagoryEntity>,
    private referenceService: ReferenceService
  ) {}

  public async createMeetingCatagory(
    createInput: CreateMeetCatagoryInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<MeetingCatagoryEntity> {
    try {
      const catagoryDetails = new MeetingCatagoryEntity({ ...createInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.meetingCatagoryRepository.create({
        ...catagoryDetails,
        reference: { id: selectedReference.id },
      });
      await this.meetingCatagoryRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateMeetingCatagory(
    updatefolder: UpdateMeetingCatagory,
    createinput: CreateMeetCatagoryInput
  ): Promise<MeetingCatagoryEntity> {
    const catagory = await this.meetingCatagoryRepository.findOne({
      where: { meetingCatagoryID: updatefolder.meetingCatagoryID },
    });
    if (catagory) {
      await this.meetingCatagoryRepository.update(catagory.id, { ...createinput });
      const updatedPost = await this.meetingCatagoryRepository.findOne({
        where: { id: catagory.id },
      });
      return updatedPost;
    }
    throw new CatagoryNotFoundException(catagory.meetingCatagoryID);
  }

  public async findAllMeetingCatagory(refFilter: ReferenceFilterParams): Promise<MeetingCatagoryEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    return await this.meetingCatagoryRepository.find({
      where: { reference: { id: selectedReference.id } },
    });
  }

  public async deleteMeetingCatagoryByID(DeleteInput: UpdateMeetingCatagory): Promise<MeetingCatagoryEntity[]> {
    const { meetingCatagoryID } = DeleteInput;
    const catagoryDetails = await this.meetingCatagoryRepository.delete({ meetingCatagoryID: meetingCatagoryID });
    const catagory = await this.meetingCatagoryRepository.find({
      where: { meetingCatagoryID: meetingCatagoryID },
    });
    return catagory;
  }
}
