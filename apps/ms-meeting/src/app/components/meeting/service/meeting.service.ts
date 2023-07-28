import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MembersEntity from "../../../entities/members.entity";
import MeetingEntity from "../../../entities/meeting.entity";
import MeetingFilesEntity from "../../../entities/meeting-files.entity";
import SortFilterParam from '../../../utils/types/sortParam';
import StatusFilterParam from '../../../utils/types/status.filter';
import { Pagination, PaginationOptionsInterface } from "../../paginate";
import MeetingFilterParam from "../dto/args/meeting.filter";
import MeetingDetailFilterParam from "../dto/args/meeting.detail.filter";
import { MeetingDeleteInput } from "../dto/input/meeting-delete.input";
import { MeetingDetailsUpdateInput } from "../dto/input/meeting-details-update.input";
import { MeetingDetailsInput } from "../dto/input/meeting-details.input";
import { MeetingErrorTypeEnum } from "../../../enums/meeting-error-type.enum";
import MeetingCustomError from "../../../exceptions/meetingCustomError.exception";

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(MeetingEntity)
    private meetingRepository: Repository<MeetingEntity>,
    @InjectRepository(MeetingFilesEntity)
    private meetingFilesRepository: Repository<MeetingFilesEntity>,
    @InjectRepository(MembersEntity)
    private membersRepository: Repository<MembersEntity>,

  ) { }

  public async addMeeting(createInput: MeetingDetailsInput): Promise<MeetingEntity> {
     
    try {
       const { meetingBasics, members, meetingFiles } = createInput;
      const meetingDetails = new MeetingEntity({ ...meetingBasics });
      const isExist = await this.meetingRepository.count({ where: { meetingTitle: meetingBasics.meetingTitle } })
      if (isExist > 0) {
        // throw new HttpException("Record already exist with this title", HttpStatus.FOUND)        
        throw new MeetingCustomError(MeetingErrorTypeEnum.RECORD_ALREADY_EXIST)       
      }

      // handling client input error
      let errorType:number;
      if(!members){
        errorType = MeetingErrorTypeEnum.NO_MEMBERS
      }
      if(!meetingBasics.meetingEndTime || !meetingBasics.meetingStartTime){
        errorType = MeetingErrorTypeEnum.NO_TIME
      }
      if(!meetingBasics.meetingDate){
        errorType = MeetingErrorTypeEnum.NO_DATE
      }
      if(!meetingBasics.meetingTitle){
        errorType = MeetingErrorTypeEnum.NO_TITLE
      }
      if(errorType){
        throw new MeetingCustomError(errorType)
      }
     
      if (members) {
        for (let index = 0; index < members.length; index++) {
          let relationAddMember = await this.membersRepository.findOne({ where: { memberID: members[index].memberID } });
          if (!relationAddMember) {
            const membersEntity = new MembersEntity(members[index])
            const newMember = await this.membersRepository.create({ ...membersEntity });
            relationAddMember = await this.membersRepository.save(newMember);
          }

          if (index === 0) {
            meetingDetails.members = [relationAddMember]
          } else {
            meetingDetails.members.push(relationAddMember)
          }
        }
      }

      if (meetingFiles) {
        if (meetingDetails?.meetingFiles?.length > 0) {
          const previousMeetingFileIds = meetingDetails.meetingFiles.map((item) => item.id)
          await this.meetingFilesRepository.delete(previousMeetingFileIds);
        }
        for (let index = 0; index < meetingFiles.length; index++) {
          const meetingFileEntity = new MeetingFilesEntity(meetingFiles[index])
          const newMeetingFile = await this.meetingFilesRepository.create({ ...meetingFileEntity });
          const savedMeetingFile = await this.meetingFilesRepository.save(newMeetingFile);

          if (index === 0) {
            meetingDetails.meetingFiles = [savedMeetingFile]
          } else {
            meetingDetails.meetingFiles.push(savedMeetingFile)
          }
        }
      }

      const newMeeting = await this.meetingRepository.create({
        ...meetingDetails,
      });
      await this.meetingRepository.save(newMeeting);
      return newMeeting;
    } catch (error) {
      return error;
    }
  }

  async findMeetingList(
    options?: PaginationOptionsInterface,
    meetingFilter?: MeetingFilterParam,
    statusFilter?: StatusFilterParam,
    sortFilter?: SortFilterParam): Promise<Pagination<MeetingEntity>> {

    const filterByStatus = statusFilter ? { status: statusFilter.status } : {}
    const sorting = sortFilter?.sortBy === 'DESC' ? { order: { createdAt: "DESC" } } : {}
    const paginationLimitSkip = { take: options.limit, skip: options.page * options.limit }

    const [results, total] = await this.meetingRepository.findAndCount({
      where: {
        ...meetingFilter,
        isDeleted: false,
        ...filterByStatus,
        status: statusFilter.status,
        ...sorting
      },
      ...paginationLimitSkip,
      relations: ['members', 'meetingFiles'],
    }
    );
    const pagination = new Pagination({
      results,
      total,
    });
    return pagination
  }

  async findMeetingById(meetingDetailFilter: MeetingDetailFilterParam):Promise<MeetingEntity> {
    const meeting = await this.meetingRepository.findOne({ where: { ...meetingDetailFilter }, relations: ['members', 'meetingFiles'] });
    if (!meeting) {
      throw new MeetingCustomError(MeetingErrorTypeEnum.RECORD_NOT_EXIST)
    }
   
    return meeting;
  }

  public async updateMeetingById(meetingUpdateInput: MeetingDetailsUpdateInput): Promise<MeetingEntity> {
    try {
      const { meetingBasics, members, meetingFiles } = meetingUpdateInput;
      const meetingDetail = await this.meetingRepository.findOne({
        where: { meetingId: meetingBasics.meetingId },
        relations: ['members', 'meetingFiles']
      });
      if (!meetingDetail) {
        throw new MeetingCustomError(MeetingErrorTypeEnum.RECORD_NOT_EXIST)
      }

      // handling client input error
      let errorType:number;
      if(!members){
        errorType = MeetingErrorTypeEnum.NO_MEMBERS
      }
      if(!meetingBasics.meetingEndTime || !meetingBasics.meetingStartTime){
        errorType = MeetingErrorTypeEnum.NO_TIME
      }
      if(!meetingBasics.meetingDate){
        errorType = MeetingErrorTypeEnum.NO_DATE
      }
      if(!meetingBasics.meetingTitle){
        errorType = MeetingErrorTypeEnum.NO_TITLE
      }
      if(errorType){
        throw new MeetingCustomError(errorType)
      }

      if (members) {
        for (let index = 0; index < members.length; index++) {
          let relationAddMember = await this.membersRepository.findOne({ where: { memberID: members[index].memberID } });
          if (!relationAddMember) {
            const membersEntity = new MembersEntity(members[index])
            const newMember = await this.membersRepository.create({ ...membersEntity });
            relationAddMember = await this.membersRepository.save(newMember);
          }

          if (index === 0) {
            meetingDetail.members = [relationAddMember]
          } else {
            meetingDetail.members.push(relationAddMember)
          }
        }
      }

      if (meetingFiles) {
        if (meetingDetail.meetingFiles.length > 0) {
          const previousMeetingFileIds = meetingDetail.meetingFiles.map((item) => item.id)
          await this.meetingFilesRepository.delete(previousMeetingFileIds);
        }
        for (let index = 0; index < meetingFiles.length; index++) {
          const meetingFileEntity = new MeetingFilesEntity(meetingFiles[index])
          const newMeetingFile = await this.meetingFilesRepository.create({ ...meetingFileEntity });
          const savedMeetingFile = await this.meetingFilesRepository.save(newMeetingFile);

          if (index === 0) {
            meetingDetail.meetingFiles = [savedMeetingFile]
          } else {
            meetingDetail.meetingFiles.push(savedMeetingFile)
          }
        }
      }

      meetingBasics.companyId ? meetingDetail.companyId = meetingBasics.companyId : null;
      meetingBasics.projectTypeId ? meetingDetail.projectTypeId = meetingBasics.projectTypeId : null;
      meetingBasics.workTypeId ? meetingDetail.workTypeId = meetingBasics.workTypeId : null;
      meetingBasics.sessionId ? meetingDetail.sessionId = meetingBasics.sessionId : null;
      meetingBasics.meetingId ? meetingDetail.meetingId = meetingBasics.meetingId : null;
      meetingBasics.meetingTitle ? meetingDetail.meetingTitle = meetingBasics.meetingTitle : null;
      meetingBasics.meetingDate ? meetingDetail.meetingDate = meetingBasics.meetingDate : null;
      meetingBasics.meetingStartTime ? meetingDetail.meetingStartTime = meetingBasics.meetingStartTime : null;
      meetingBasics.meetingEndTime ? meetingDetail.meetingEndTime = meetingBasics.meetingEndTime : null;
      meetingBasics.meetingDuration ? meetingDetail.meetingDuration = meetingBasics.meetingDuration : null;
      meetingBasics.inviteGuests ? meetingDetail.inviteGuests = meetingBasics.inviteGuests : null;
      meetingBasics.meetingDescription ? meetingDetail.meetingDescription = meetingBasics.meetingDescription : null;
      meetingBasics.protocolId ? meetingDetail.protocolId = meetingBasics.protocolId : null;
      meetingBasics.protocolTitle ? meetingDetail.protocolTitle = meetingBasics.protocolTitle : null;
      meetingBasics.status ? meetingDetail.status = meetingBasics.status : null;
      // meetingBasics.updatedBy ? meetingDetail.updatedBy = meetingBasics.updatedBy : null;
      // meetingBasics.updatedAt ? meetingDetail.updatedAt = meetingBasics.updatedAt : null;
      await this.meetingRepository.save(meetingDetail);
      const meetingUpdatedDetail = await this.meetingRepository.findOne({
        where: { meetingId: meetingBasics.meetingId },
        relations: ['members', 'meetingFiles']
      });
      return meetingUpdatedDetail;
    } catch (error) {
      return error;
    }
  }

  public async deleteMeetingById(meetingDeleteInput: MeetingDeleteInput): Promise<MeetingEntity> {
    const meetingDetail = await this.meetingRepository.findOne({
      where: { meetingId: meetingDeleteInput.meetingId },
      relations: ['members', 'meetingFiles']
    });
    if (meetingDetail) {
      meetingDetail.isDeleted = !(meetingDetail.isDeleted)
      const updatedMeetingDetail = await meetingDetail.save()
      return updatedMeetingDetail
    }
    throw new MeetingCustomError(MeetingErrorTypeEnum.RECORD_NOT_EXIST)
  }

}