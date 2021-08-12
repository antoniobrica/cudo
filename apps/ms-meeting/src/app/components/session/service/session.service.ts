import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { error } from "console";
import { Session } from "inspector";
import { Repository } from "typeorm";
import AdminEntity from "../../../entities/admin.entity";
import MeetingEntity from "../../../entities/meeting.entity";
import MembersEntity from "../../../entities/members.entity";
import SessionEntity from "../../../entities/session.entity";
import { MeetingErrorTypeEnum } from "../../../enums/meeting-error-type.enum";
import MeetingCustomError from "../../../exceptions/meetingCustomError.exception";
import ReferenceFilterParams from "../../../utils/types/referenceFilterParams";
import { Pagination, PaginationOptionsInterface } from "../../paginate";
import { ReferenceService } from "../../reference/service/reference.service";
import SessionFilterParam from "../dto/args/session.filter";
import { SessionDeleteInput } from "../dto/input/session-delete.input";
import { SessionDetailsUpdateInput } from "../dto/input/session-details-update.input";
import { SessionDetailsInput } from "../dto/input/session-details.input";
import SessionNotFoundException from "../exceptions/sessionNotFound.exception";


@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(SessionEntity)
        private sessionRepository: Repository<SessionEntity>,
        @InjectRepository(AdminEntity)
        private adminRepository: Repository<AdminEntity>,
        @InjectRepository(MembersEntity)
        private membersRepo: Repository<MembersEntity>,
        @InjectRepository(MeetingEntity)
        private meetingRepository: Repository<MeetingEntity>,
        private referenceService: ReferenceService
    ) { }

    public async create(createInput: SessionDetailsInput, referenceFilter: ReferenceFilterParams): Promise<SessionEntity> {
        try {
            const { admins, sessionBasics, members } = createInput;

            // handling client input error
            let errorType: number;
            if (!members) {
                errorType = MeetingErrorTypeEnum.NO_MEMBERS
            }
            if (!admins) {
                errorType = MeetingErrorTypeEnum.NO_ADMIN
            }
            if (!sessionBasics.meetingCategoryID) {
                errorType = MeetingErrorTypeEnum.NO_CATEGORY
            }
            if (!sessionBasics.worktypeID) {
                errorType = MeetingErrorTypeEnum.NO_WORKTYPE
            }
            if (!sessionBasics.sessionTitle) {
                errorType = MeetingErrorTypeEnum.NO_TITLE
            }
            if (errorType) {
                throw new MeetingCustomError(errorType)
            }

            const sessionDetails = new SessionEntity({ ...sessionBasics });

            if (admins) {
                for (let index = 0; index < admins.length; index++) {
                    let relationAddAdmin = await this.adminRepository.findOne({ where: { adminID: admins[index].adminID } });
                    if (!relationAddAdmin) {
                        const adminsEntity = new AdminEntity(admins[index])
                        const newAdmin = await this.adminRepository.create({ ...adminsEntity });
                        relationAddAdmin = await this.adminRepository.save(newAdmin);
                    }

                    if (index === 0) {
                        sessionDetails.admins = [relationAddAdmin]
                    } else {
                        sessionDetails.admins.push(relationAddAdmin)
                    }
                }
            }

            if (members) {
                for (let index = 0; index < members.length; index++) {
                    let relationAddMember = await this.membersRepo.findOne({ where: { memberID: members[index].memberID } });
                    if (!relationAddMember) {
                        const membersEntity = new MembersEntity(members[index])
                        const newMember = await this.membersRepo.create({ ...membersEntity });
                        relationAddMember = await this.membersRepo.save(newMember);
                    }

                    if (index === 0) {
                        sessionDetails.members = [relationAddMember]
                    } else {
                        sessionDetails.members.push(relationAddMember)
                    }
                }
            }


            const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
            const newSession = await this.sessionRepository.create({
                ...sessionDetails,
                reference: { id: selectedReference.id }
            });
            await this.sessionRepository.save(newSession);
            return newSession;
        } catch (error) {
            return error;
        }
    }

    async getSessionID(sessionFilter: SessionFilterParam) {
        const session = await this.sessionRepository.findOne({ where: { ...sessionFilter }, relations: ['members', 'admins'] });
        if (session) {
            return session;
        }
        throw new MeetingCustomError(MeetingErrorTypeEnum.RECORD_NOT_EXIST)
    }

    async paginate(
        options: PaginationOptionsInterface,
        refFilter: ReferenceFilterParams
    ): Promise<Pagination<SessionEntity>> {

        const selectedReference = await this.referenceService.getReferenceById(refFilter)


        const [results, total] = await this.sessionRepository.findAndCount({
            where: {
                "reference": {
                    id: selectedReference.id
                },
                isDeleted: false
            },
            relations: ['reference', 'admins', 'members'],
            take: options.limit,
            skip: options.page * options.limit,
        }
        );
        const pagination = new Pagination({
            results,
            total,
        });
        return pagination
    }

    public async findAllSessions(): Promise<SessionEntity[]> {
        return await this.sessionRepository.find({ where: { 'isDeleted': false, }, relations: ['reference', 'admins', 'members'] });
    }

    public async updateSessionById(sessionUpdateInput: SessionDetailsUpdateInput): Promise<SessionEntity> {
        const { sessionBasics, admins, members } = sessionUpdateInput;
        const sessionDetail = await this.sessionRepository.findOne({
            where: { sessionID: sessionBasics.sessionID },
            relations: ['reference', 'admins', 'members']
        });
        if (!sessionDetail) {
            throw new MeetingCustomError(MeetingErrorTypeEnum.RECORD_NOT_EXIST)
        }

        // handling client input error
        let errorType: number;
        if (!members) {
            errorType = MeetingErrorTypeEnum.NO_MEMBERS
        }
        if (!admins) {
            errorType = MeetingErrorTypeEnum.NO_ADMIN
        }
        if (!sessionBasics.meetingCategoryID) {
            errorType = MeetingErrorTypeEnum.NO_CATEGORY
        }
        if (!sessionBasics.worktypeID) {
            errorType = MeetingErrorTypeEnum.NO_WORKTYPE
        }
        if (!sessionBasics.sessionTitle) {
            errorType = MeetingErrorTypeEnum.NO_TITLE
        }
        if (errorType) {
            throw new MeetingCustomError(errorType)
        }

        if (admins) {
            for (let index = 0; index < admins.length; index++) {
                let relationAddAdmin = await this.adminRepository.findOne({ where: { adminID: admins[index].adminID } });
                if (!relationAddAdmin) {
                    const adminsEntity = new AdminEntity(admins[index])
                    const newAdmin = await this.adminRepository.create({ ...adminsEntity });
                    relationAddAdmin = await this.adminRepository.save(newAdmin);
                }

                if (index === 0) {
                    sessionDetail.admins = [relationAddAdmin]
                } else {
                    sessionDetail.admins.push(relationAddAdmin)
                }
            }
        }

        if (members) {
            for (let index = 0; index < members.length; index++) {
                let relationAddMember = await this.membersRepo.findOne({ where: { memberID: members[index].memberID } });
                if (!relationAddMember) {
                    const membersEntity = new MembersEntity(members[index])
                    const newMember = await this.membersRepo.create({ ...membersEntity });
                    relationAddMember = await this.membersRepo.save(newMember);
                }

                if (index === 0) {
                    sessionDetail.members = [relationAddMember]
                } else {
                    sessionDetail.members.push(relationAddMember)
                }
            }
        }

        sessionBasics.sessionTitle ? sessionDetail.sessionTitle = sessionBasics.sessionTitle : null;
        sessionBasics.worktypeID ? sessionDetail.worktypeID = sessionBasics.worktypeID : null;
        sessionBasics.worktypeTitle ? sessionDetail.worktypeTitle = sessionBasics.worktypeTitle : null;
        sessionBasics.meetingCategoryID ? sessionDetail.meetingCategoryID = sessionBasics.meetingCategoryID : null;
        sessionBasics.meetingCategoryTitle ? sessionDetail.meetingCategoryTitle = sessionBasics.meetingCategoryTitle : null;
        sessionBasics.invitationID ? sessionDetail.invitationID = sessionBasics.invitationID : null;
        sessionBasics.invitationTitle ? sessionDetail.invitationTitle = sessionBasics.invitationTitle : null;
        sessionBasics.protocolID ? sessionDetail.protocolID = sessionBasics.protocolID : null;
        sessionBasics.protocolTitle ? sessionDetail.protocolTitle = sessionBasics.protocolTitle : null;
        sessionBasics.sessionID ? sessionDetail.sessionID = sessionBasics.sessionID : null;
        // sessionBasics.updatedBy ? sessionDetail.updatedBy = sessionBasics.updatedBy : null;
        // sessionBasics.updatedAt ? sessionDetail.updatedAt = sessionBasics.updatedAt : null;
        await this.sessionRepository.save(sessionDetail);
        const sessionUpdatedDetail = await this.sessionRepository.findOne({
            where: { sessionID: sessionBasics.sessionID },
            relations: ['reference', 'admins', 'members']
        });
        return sessionUpdatedDetail;
    }

    public async deleteSession(sessionDeleteInput: SessionDeleteInput): Promise<SessionEntity> {
        const session = await this.sessionRepository.findOne({ where: { sessionID: sessionDeleteInput.sessionID } });
        if (session) {
            // #region session wise meetings delete            
            const meetingList = await this.meetingRepository.find({ where: { sessionId: session.sessionID } })
            if (meetingList?.length) {
                const meetingIds = meetingList.map(({ id }) => id)
                if (meetingIds) {
                    const meetingIsDeleted = !(session.isDeleted)
                    await this.meetingRepository.update(meetingIds, { isDeleted: meetingIsDeleted })
                }
            }
            // #endregion
            session.isDeleted = !(session.isDeleted)
            const updatedPost = await session.save()
            return updatedPost
        }

        throw new MeetingCustomError(MeetingErrorTypeEnum.RECORD_NOT_EXIST)
    }
}