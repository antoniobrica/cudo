import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// import MeetingEntity from "../../../entities/meeting.entity";
import ProtocolFileEntity from "../../../entities/protocol-file.entity";
import ProtocolEntity from "../../../entities/protocol.entity";
import { MeetingErrorTypeEnum } from "../../../enums/meeting-error-type.enum";
import MeetingCustomError from "../../../exceptions/meetingCustomError.exception";
import SortFilterParam from "../../../utils/types/sortParam";
import StatusFilterParam from "../../../utils/types/status.filter";
import { MeetingService } from "../../meeting/service/meeting.service";
import { Pagination, PaginationOptionsInterface } from "../../paginate";
import ProtocolDetailFilterParam from "../dto/args/protocol.detail.filter";
import ProtocolFilterParam from "../dto/args/protocol.filter";
import { ProtocolDeleteInput } from "../dto/input/protocol-delete-input";
import { ProtocolDeatilsInput } from "../dto/input/protocol-details.input";
import { ProtocolDetailsUpdateInput } from "../dto/input/prtocol-details-update-input";

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(ProtocolEntity) private protocolRepository: Repository<ProtocolEntity>,
    // @InjectRepository(MeetingEntity)
    // private meetingRepository: Repository<MeetingEntity>,
    @InjectRepository(ProtocolFileEntity) private protocolFileRepository: Repository<ProtocolFileEntity>,
    private meetingService: MeetingService
  ) { }

  // create protocol
  public async addProtocol(createInput: ProtocolDeatilsInput): Promise<ProtocolEntity> {
    try {
      const { protocolBasics, protocolFiles, meetings } = createInput

      // handling client input error
      let errorType: number;
      if (!protocolBasics.protocolStartTime || !protocolBasics.protocolEndTime) {
        errorType = MeetingErrorTypeEnum.NO_TIME
      }
      if (!protocolBasics.protocolDate) {
        errorType = MeetingErrorTypeEnum.NO_DATE
      }
      if (!protocolBasics.protocolTitle) {
        errorType = MeetingErrorTypeEnum.NO_TITLE
      }
      if (errorType) {
        throw new MeetingCustomError(errorType)
      }

      const protocolDetails = new ProtocolEntity({ ...protocolBasics })

      if (protocolFiles) {
        if (protocolDetails?.protocolFiles?.length > 0) {
          const previousProtocolFileIds = protocolDetails.protocolFiles.map(item => item.id)
          await this.protocolFileRepository.delete(previousProtocolFileIds)
        }
        for (let index = 0; index < protocolFiles.length; index++) {
          const protocolFileEntity = new ProtocolFileEntity(protocolFiles[index])
          const newProtocolFile = await this.protocolFileRepository.create({ ...protocolFileEntity })
          const savedProtocolFile = await this.protocolFileRepository.save(newProtocolFile)

          if (index === 0) {
            protocolDetails.protocolFiles = [savedProtocolFile]
          } else {
            protocolDetails.protocolFiles.push(savedProtocolFile)
          }
        }
      }

      if (meetings) {
        if (protocolDetails?.meetings?.length > 0) {
          protocolDetails.meetings.forEach(async (meeting) => await this.meetingService.deleteMeetingById({ meetingId: meeting.meetingId }))
          // const previousMeetingIds = protocolDetails.meetings.map(meeting => meeting.meetingId)
          // await this.meetingRepository.delete(previousMeetingIds)
        }
        for (let index = 0; index < meetings.length; index++) {

          const savedMeeting = await this.meetingService.addMeeting(meetings[index]);

          // if (index === 0) {
          //   protocolDetails.meetings = [savedMeeting]
          // } else {
          // protocolDetails.meetings.push(savedMeeting)
          // }
          protocolDetails.meetings.push(savedMeeting)
        }
      }


      const newProtocol = await this.protocolRepository.create({
        ...protocolDetails
      })
      await this.protocolRepository.save(newProtocol)

      return newProtocol
    } catch (error) {
      return error
    }
  }

  // find all created Protcols
  public async findProtocolList(
    options?: PaginationOptionsInterface,
    protocolFilter?: ProtocolFilterParam,
    statusFilter?: StatusFilterParam,
    sortFilter?: SortFilterParam
  ): Promise<Pagination<ProtocolEntity>> {

    const filterByStatus = statusFilter ? { status: statusFilter.status } : {}
    const sorting = sortFilter?.sortBy === "DESC" ? { order: { createdAt: "DESC" } } : {}
    const paginationLimitSkip = { take: options.limit, skip: options.page * options.limit }

    const [results, total] = await this.protocolRepository.findAndCount({
      where: {
        ...protocolFilter,
        isDeleted: false,
        ...filterByStatus,
        status: statusFilter.status,
        ...sorting
      },
      ...paginationLimitSkip,
      relations: ['protocolFiles', 'meetings']
    }
    );

    const pagination = new Pagination({
      results,
      total
    })
    return pagination
  }

  // get protocol by ID
  public async findProtocolById(protocolDetailFilter: ProtocolDetailFilterParam): Promise<ProtocolEntity> {
    const protocol = await this.protocolRepository.findOne({ where: { ...protocolDetailFilter }, relations: ['protocolFiles', 'meetings'] })

    if (!protocol) {
      throw new MeetingCustomError(MeetingErrorTypeEnum.NO_PROTOCOL)
    }
    return protocol
  }

  // update protocol
  public async updateProtocol(protocolUpdateInput: ProtocolDetailsUpdateInput): Promise<ProtocolEntity> {

    try {
      const { protocolBasics, meetings, protocolFiles } = protocolUpdateInput

      // handling client input error
      let errorType: number;
      if (!protocolBasics.protocolStartTime || !protocolBasics.protocolEndTime) {
        errorType = MeetingErrorTypeEnum.NO_TIME
      }
      if (!protocolBasics.protocolDate) {
        errorType = MeetingErrorTypeEnum.NO_DATE
      }
      if (!protocolBasics.protocolTitle) {
        errorType = MeetingErrorTypeEnum.NO_TITLE
      }
      if (errorType) {
        throw new MeetingCustomError(errorType)
      }
      const protocolDetails = await this.protocolRepository.findOne({
        where: { protocolId: protocolBasics.protocolId },
        relations: ['protocolFiles', 'meetings']
      })

      if (!protocolDetails) {
        throw new MeetingCustomError(MeetingErrorTypeEnum.NO_PROTOCOL)
      }

      if (meetings) {
        if (protocolDetails?.meetings?.length > 0) {
          protocolDetails.meetings.forEach(async (meeting) => await this.meetingService.deleteMeetingById({ meetingId: meeting.meetingId }))
          // const previousMeetingIds = protocolDetails.meetings.map(meeting => meeting.meetingId)
          // await this.meetingRepository.delete(previousMeetingIds)
        }
        for (let index = 0; index < meetings.length; index++) {
          const savedMeeting = await this.meetingService.addMeeting(meetings[index]);

          // if (index === 0) {
          //   protocolDetails.meetings = [savedMeeting]
          // } else {
          // protocolDetails.meetings.push(savedMeeting)
          // }
          protocolDetails.meetings.push(savedMeeting)

        }
      }

      if (protocolFiles) {
        if (protocolDetails.protocolFiles.length > 0) {
          const previousProtocolFileIds = protocolDetails.protocolFiles.map(item => item.id)
          await this.protocolFileRepository.delete(previousProtocolFileIds)
        }
        for (let index = 0; index < protocolFiles.length; index++) {
          const protocolFileEntity = new ProtocolFileEntity(protocolFiles[index])
          const newProtocolFile = await this.protocolFileRepository.create({ ...protocolFileEntity })
          const savedProtocolFile = await this.protocolFileRepository.save(newProtocolFile)
          if (index === 0) {
            protocolDetails.protocolFiles = [savedProtocolFile]
          } else {
            protocolDetails.protocolFiles.push(savedProtocolFile)
          }
        }
      }

      protocolBasics.companyId ? protocolDetails.companyId = protocolBasics.companyId : null
      protocolBasics.projectTypeId ? protocolDetails.projectTypeId = protocolBasics.projectTypeId : null
      protocolBasics.protocolDate ? protocolDetails.protocolDate = protocolBasics.protocolDate : null
      protocolBasics.protocolDescription ? protocolDetails.protocolDescription = protocolBasics.protocolDescription : null
      protocolBasics.protocolDuration ? protocolDetails.protocolDuration = protocolBasics.protocolDuration : null
      protocolBasics.protocolEndTime ? protocolDetails.protocolEndTime = protocolBasics.protocolEndTime : null
      protocolBasics.protocolId ? protocolDetails.protocolId = protocolBasics.protocolId : null
      protocolBasics.protocolStartTime ? protocolDetails.protocolStartTime = protocolBasics.protocolStartTime : null
      protocolBasics.protocolTitle ? protocolDetails.protocolTitle = protocolBasics.protocolTitle : null
      protocolBasics.sessionId ? protocolDetails.sessionId = protocolBasics.sessionId : null
      protocolBasics.status ? protocolDetails.status = protocolBasics.status : null
      protocolBasics.workTypeId ? protocolDetails.workTypeId = protocolBasics.workTypeId : null



      await this.protocolRepository.save(protocolDetails)
      const protocolUpdatedDetails = await this.protocolRepository.findOne({
        where: { protocolId: protocolBasics.protocolId },
        relations: ['protocolFiles', 'meetings']
      })
      return protocolUpdatedDetails
    } catch (error) {
      return error
    }
  }

  // delete protocol using id
  public async deleteProtocol(protocolDeleteInput: ProtocolDeleteInput): Promise<ProtocolEntity> {
    const protocolDetails = await this.findProtocolById(protocolDeleteInput)
    if (protocolDetails) {
      protocolDetails.isDeleted = !(protocolDetails.isDeleted)
      const updatedMeetingDetail = await protocolDetails.save()
      return updatedMeetingDetail
    }
    throw new MeetingCustomError(MeetingErrorTypeEnum.NO_PROTOCOL)
  }

}