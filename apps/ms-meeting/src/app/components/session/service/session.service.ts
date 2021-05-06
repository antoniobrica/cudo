import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AdminEntity from "../../../entities/admin.entity";
import MembersEntity from "../../../entities/members.entity";
import SessionEntity from "../../../entities/session.entity";
import ReferenceFilterParams from "../../../utils/types/referenceFilterParams";
import { Pagination, PaginationOptionsInterface } from "../../paginate";
import { ReferenceService } from "../../reference/service/reference.service";
import SessionFilterParam from "../dto/args/session.filter";
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
        private referenceService: ReferenceService
    ) { }

    public async create(createInput: SessionDetailsInput, referenceFilter: ReferenceFilterParams): Promise<SessionEntity> {
        try {
            const { admins,sessionBasics, members } = createInput;
            const sessionDetails = new SessionEntity({ ...sessionBasics });
            sessionDetails.admins = [];
            sessionDetails.members = [];
  
            if (admins)
                for (let index = 0; index < admins.length; index++) {
                    const adminsentity = new AdminEntity(admins[index])
                    const newAdmin = await this.adminRepository.create({ ...adminsentity });
                    const savedAdmin = await this.adminRepository.save(newAdmin);
                    sessionDetails.admins.push(savedAdmin)
                }

            if (members)
            for (let index = 0; index < members.length; index++) {
                const membersentity = new MembersEntity(members[index])
                const newMembers = await this.membersRepo.create({ ...membersentity });
                const savedFollower = await this.membersRepo.save(newMembers);
                sessionDetails.members.push(savedFollower)
            }

            const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
            const newSession = await this.sessionRepository.create({
                ...sessionDetails,
                reference: { id: selectedReference.id }
            });
            await this.sessionRepository.save(newSession);
            return newSession;
        }   catch (error) {
            return error;
        }
    }

    async getSessionID(sessionFilter: SessionFilterParam) {
        const session = await this.sessionRepository.findOne({ where: { ...sessionFilter }, relations: ['members','admins'] });
        if (session) {
            return session;
        }
        throw new SessionNotFoundException(session.sessionID);
    }

    async paginate(
        options: PaginationOptionsInterface,
        refFilter: ReferenceFilterParams
    ): Promise<Pagination<SessionEntity>> {

        const selectedReference = await this.referenceService.getReferenceById(refFilter)

        
        const [results, total] = await this.sessionRepository.findAndCount({ where: {
            "reference": {
                id: selectedReference.id
            }
        },
        relations:['reference','admins','members'],
        take: options.limit,
        skip: options.page * options.limit,
        }
        );            
        const pagination =  new Pagination({
            results,
            total,
        });      
        return pagination
    }
}