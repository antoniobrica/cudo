import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// import AdminEntity from "../../../entities/admin.entity";
import MembersEntity from "../../../entities/members.entity";
import MeetingEntity from "../../../entities/meeting.entity";
import MeetingFilesEntity from "../../../entities/meeting-files.entity";
import ReferenceFilterParams from "../../../utils/types/referenceFilterParams";
// import { Pagination, PaginationOptionsInterface } from "../../paginate";
import { ReferenceService } from "../../reference/service/reference.service";
import MeetingFilterParam from "../dto/args/meeting.filter";
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
      public async create(createInput: MeetingDetailsInput): Promise<MeetingEntity> {
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
        }   catch (error) {
            return error;
        }
    }

    // // async getMeetingList(meetingFilter: MeetingFilterParam) {
    //   async getMeetingList() {
    //     // const meetings = await this.meetingRepository.find({ where: { ...meetingFilter }, relations: ['members','meetingFiles'] });
    //     const meetings = await this.meetingRepository.find({});
    //     if (meetings) {
    //         return meetings;
    //     }
    //     // throw new MeetingNotFoundException(meeting.meetingId);
    // }


    // #region Commented Session Code
    // async getSessionID(sessionFilter: SessionFilterParam) {
    //     const session = await this.sessionRepository.findOne({ where: { ...sessionFilter }, relations: ['members','admins'] });
    //     if (session) {
    //         return session;
    //     }
    //     throw new SessionNotFoundException(session.sessionID);
    // }

    // async paginate(
    //     options: PaginationOptionsInterface,
    //     refFilter: ReferenceFilterParams
    // ): Promise<Pagination<SessionEntity>> {

    //     const selectedReference = await this.referenceService.getReferenceById(refFilter)

        
    //     const [results, total] = await this.sessionRepository.findAndCount({ where: {
    //         "reference": {
    //             id: selectedReference.id
    //         }
    //     },
    //     relations:['reference','admins','members'],
    //     take: options.limit,
    //     skip: options.page * options.limit,
    //     }
    //     );            
    //     const pagination =  new Pagination({
    //         results,
    //         total,
    //     });      
    //     return pagination
    // }

    // public async findAllSessions(): Promise<SessionEntity[]> {
    //     return await this.sessionRepository.find({relations:['reference','admins','members']});
    //   }

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