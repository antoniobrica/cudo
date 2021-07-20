import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// import AdminEntity from "../../../entities/admin.entity";
import MembersEntity from "../../../entities/members.entity";
import MeetingEntity from "../../../entities/meeting.entity";
import MeetingFilesEntity from "../../../entities/meeting-files.entity";
import ReferenceFilterParams from "../../../utils/types/referenceFilterParams";
import SortFilterParam from '../../../utils/types/sortParam';
import StatusFilterParam from '../../../utils/types/status.filter';
import { Pagination, PaginationOptionsInterface } from "../../paginate";
import { ReferenceService } from "../../reference/service/reference.service";
import MeetingFilterParam from "../dto/args/meeting.filter";
import MeetingDetailFilterParam from "../dto/args/meeting.detail.filter";
// import { SessionDeleteInput } from "../dto/input/session-delete.input";
// import { SessionDetailsUpdateInput } from "../dto/input/session-details-update.input";
import { MeetingDetailsInput } from "../dto/input/meeting-details.input";
import MeetingNotFoundException from "../exceptions/meetingNotFound.exception";


@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(MeetingEntity)
    private meetingRepository: Repository<MeetingEntity>,
    @InjectRepository(MeetingFilesEntity)
    private meetingFilesRepository: Repository<MeetingFilesEntity>,
    @InjectRepository(MembersEntity)
    private membersRepo: Repository<MembersEntity>,
    // private referenceService: ReferenceService
  ) { }

  // public async create(createInput: MeetingDetailsInput, referenceFilter: ReferenceFilterParams): Promise<MeetingEntity> {
  public async addMeeting(createInput: MeetingDetailsInput): Promise<MeetingEntity> {
    try {
      const { meetingBasics, members, meetingFiles } = createInput;
      const meetingDetails = new MeetingEntity({ ...meetingBasics });
      meetingDetails.members = [];
      meetingDetails.meetingFiles = [];


      if (members) {
        for (let index = 0; index < members.length; index++) {
          const membersentity = new MembersEntity(members[index])
          const newMembers = await this.membersRepo.create({ ...membersentity });
          const savedFollower = await this.membersRepo.save(newMembers);
          meetingDetails.members.push(savedFollower)
        }
      }

      if (meetingFiles) {
        for (let index = 0; index < meetingFiles.length; index++) {
          const meetingFilesntity = new MeetingFilesEntity(meetingFiles[index])
          const newMeetingFiles = await this.meetingFilesRepository.create({ ...meetingFilesntity });
          const savedMeetingFiles = await this.meetingFilesRepository.save(newMeetingFiles);
          meetingDetails.meetingFiles.push(savedMeetingFiles)
        }
      }

      // const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
      const newMeeting = await this.meetingRepository.create({
        ...meetingDetails,
        // reference: { id: selectedReference.id }
      });
      await this.meetingRepository.save(newMeeting);
      return newMeeting;
    } catch (error) {
      return error;
    }
  }

  // async findAllMeetingList(meetingFilter: MeetingFilterParam) {
  //   const meetings = await this.meetingRepository.find({ where: { ...meetingFilter }, relations: ['members', 'meetingFiles'] });
  //   return meetings;
  // }

  async findMeetingList(
    // refFilter: ReferenceFilterParams,
    options?: PaginationOptionsInterface,
    meetingFilter?: MeetingFilterParam,
    statusFilter?: StatusFilterParam,
    sortFilter?: SortFilterParam): Promise<Pagination<MeetingEntity>> {

    // const selectedReference = await this.referenceService.getReferenceById(refFilter)

    // #region commented code
    // if (options) {
    //   if (options && statusFilter) {
    //     const [results, total] = await this.meetingRepository.findAndCount({
    //       where: {
    //         ...meetingFilter,
    //         isDeleted: false,
    //         status: statusFilter.status,
    //         // "reference": {
    //         //   id: selectedReference.id
    //         // }
    //       },
    //       relations: ['members', 'meetingFiles'],
    //       take: options.limit,
    //       skip: options.page * options.limit,
    //     }
    //     );
    //     const pagination = new Pagination({
    //       results,
    //       total,
    //     });
    //     return pagination
    //   }
    //   if (options && statusFilter && sortFilter) {
    //     if (sortFilter.sortBy == "DESC") {
    //       const [results, total] = await this.meetingRepository.findAndCount({
    //         where: {
    //           ...meetingFilter,
    //           isDeleted: false,
    //           status: statusFilter.status,
    //           // "reference": {
    //           //   id: selectedReference.id
    //           // }
    //         },
    //         relations: ['members', 'meetingFiles'],
    //         take: options.limit,
    //         skip: options.page * options.limit,
    //       }
    //       );
    //       const pagination = new Pagination({
    //         results,
    //         total,
    //       });
    //       return pagination
    //     }
    //   }
    // }
    // if (statusFilter) {
    //   const [results, total] = await this.meetingRepository.findAndCount({
    //     where: {
    //       ...meetingFilter,
    //       isDeleted: false,
    //       status: statusFilter.status,
    //       // "reference": {
    //       //   id: selectedReference.id
    //       // }
    //     },
    //     relations: ['members', 'meetingFiles'],
    //   }
    //   );
    //   const pagination = new Pagination({
    //     results,
    //     total,
    //   });
    //   return pagination
    // }
    // if (sortFilter) {
    //   if (sortFilter.sortBy == "DESC") {
    //     const [results, total] = await this.meetingRepository.findAndCount({
    //       where: {
    //         ...meetingFilter,
    //         isDeleted: false,
    //         // "reference": {
    //         //   id: selectedReference.id
    //         // }, 
    //         order: { createdAt: "DESC" }
    //       },
    //       relations: ['members', 'meetingFiles'],
    //     }
    //     );
    //     const pagination = new Pagination({
    //       results,
    //       total,
    //     });
    //     return pagination
    //   }
    // }
    // else {
    // #endregion

    const filterByStatus = statusFilter ? { status: statusFilter.status } : {}
    const sorting = sortFilter?.sortBy === 'DESC' ? { order: { createdAt: "DESC" } } : {}
    const paginationLimitSkip = { take: options.limit, skip: options.page * options.limit }

    const [results, total] = await this.meetingRepository.findAndCount({
      where: {
        ...meetingFilter,
        isDeleted: false,
        ...filterByStatus,
        // "reference": {
        //   id: selectedReference.id
        // }
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
    // }
  }

  async findMeetingByID(meetingDetailFilter: MeetingDetailFilterParam) {
    const meeting = await this.meetingRepository.findOne({ where: { ...meetingDetailFilter }, relations: ['members', 'meetingFiles'] });
    if (meeting) {
      return meeting;
    }
    throw new MeetingNotFoundException(meeting.meetingId);
  }

  // #region Commented Session Code

  // public async updateSessionByID(createInput: SessionDetailsUpdateInput): Promise<SessionEntity[]> {
  //     const { sessionBasics, admins, members } = createInput;
  //     const sessionDetails = await this.sessionRepository.find({
  //         where: { sessionID: sessionBasics.sessionID },
  //         relations: ['reference', 'admins', 'members']
  //     });
  //     if (sessionDetails.length <= 0)
  //         throw new HttpException('Session Not Found', HttpStatus.NOT_FOUND);
  //     const sessionDetail = sessionDetails[0];
  //     sessionDetail.admins = [];
  //     sessionDetail.members = [];

  //     if (admins)
  //         for (let index = 0; index < admins.length; index++) {
  //             const adminsentity = new AdminEntity(admins[index])
  //             const newAdmin = await this.adminRepository.create({ ...adminsentity });
  //             const savedAdmin = await this.adminRepository.save(newAdmin);
  //             sessionDetail.admins.push(savedAdmin)
  //         }
  //     if (members)
  //         for (let index = 0; index < members.length; index++) {
  //             const membersentity = new MembersEntity(members[index])
  //             const newmembers = await this.membersRepo.create({ ...membersentity });
  //             const savedFollower = await this.membersRepo.save(newmembers);
  //             sessionDetail.members.push(savedFollower)
  //         }

  //     sessionBasics.sessionTitle ? sessionDetail.sessionTitle = sessionBasics.sessionTitle : null;
  //     sessionBasics.worktypeID ? sessionDetail.worktypeID = sessionBasics.worktypeID : null;
  //     sessionBasics.worktypeTitle ? sessionDetail.worktypeTitle = sessionBasics.worktypeTitle : null;
  //     sessionBasics.meetingCategoryID ? sessionDetail.meetingCategoryID = sessionBasics.meetingCategoryID : null;
  //     sessionBasics.meetingCategoryTitle ? sessionDetail.meetingCategoryTitle = sessionBasics.meetingCategoryTitle : null;
  //     sessionBasics.invitationID ? sessionDetail.invitationID = sessionBasics.invitationID : null;
  //     sessionBasics.invitationTitle ? sessionDetail.invitationTitle = sessionBasics.invitationTitle : null;
  //     sessionBasics.protocolID ? sessionDetail.protocolID = sessionBasics.protocolID : null;
  //     sessionBasics.protocolTitle ? sessionDetail.protocolTitle = sessionBasics.protocolTitle : null;
  //     sessionBasics.sessionID ? sessionDetail.sessionID = sessionBasics.sessionID : null;
  //     await this.sessionRepository.save(sessionDetail);
  //     const sessions = await this.sessionRepository.find({
  //         where: { sessionID: sessionBasics.sessionID },
  //         relations: ['reference', 'admins', 'members']
  //     });
  //     return sessions;
  // }

  // public async deleteSessionByID(sessionDeleteInput: SessionDeleteInput): Promise<SessionEntity[]> {
  //     const { sessionID } = sessionDeleteInput;
  //     const sessioneDetails = await this.sessionRepository.delete({ sessionID: sessionID });
  //     console.log(sessioneDetails)
  //     const sessions = await this.sessionRepository.find({
  //         where: { sessionID: sessionID },
  //         relations: ['reference', 'admins', 'members']
  //     });
  //     return sessions;
  // }
  //#endregion

}