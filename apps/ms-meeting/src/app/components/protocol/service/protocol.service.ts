import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MeetingEntity from "../../../entities/meeting.entity";
import ProtocolFileEntity from "../../../entities/protocol-file.entity";
import ProtocolEntity from "../../../entities/protocol.entity";
import SortFilterParam from "../../../utils/types/sortParam";
import StatusFilterParam from "../../../utils/types/status.filter";
import { Pagination, PaginationOptionsInterface } from "../../paginate";
import ProtocolFilterParam from "../dto/args/protocol.filter";
import { ProtocolDeatilsInput } from "../dto/input/protocol-details.input";

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(ProtocolEntity) private protocolRepository: Repository<ProtocolEntity>,
    @InjectRepository(ProtocolFileEntity) private protocolFileRepository: Repository<ProtocolFileEntity>,
  ) { }

  // create protocol
  public async addProtocol(createInput: ProtocolDeatilsInput): Promise<ProtocolEntity> {
    try {
      const { protocolBasics, protocolFiles, meetings } = createInput
      const protocolDetails = new ProtocolEntity({ ...protocolBasics })

      if (protocolFiles) {
        if (protocolDetails?.protocolFiles?.length > 0) {
          const previousProtocolFileIds = protocolDetails.protocolFiles.map(item => item.id)
          await this.protocolFileRepository.delete(previousProtocolFileIds)
        }
        for (let index = 0; index < protocolFiles.length; index++){
          const protocolFileEntity = new ProtocolFileEntity(protocolFiles[index])
          const newProtocolFile = await this.protocolFileRepository.create({...protocolFileEntity})
          const savedProtocolFile = await this.protocolFileRepository.save(newProtocolFile)

          if(index === 0) {
            protocolDetails.protocolFiles = [savedProtocolFile]
          }else {
            protocolDetails.protocolFiles.push(savedProtocolFile)
          }
        }
      }

      // if(meetings) {
      //   for (let index = 0; index < meetings.length; index++){
          
      //   }
      // }

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
    statusFilter?:StatusFilterParam,
    sortFilter?:SortFilterParam
  ):Promise<Pagination<ProtocolEntity>> {

    const filterByStatus = statusFilter ? {status: statusFilter.status} : {}
    const sorting = sortFilter?.sortBy === "DESC" ? {order: {createdAt: "DESC"}} : {}
    const paginationLimitSkip = {take: options.limit, skip: options.page * options.limit}

    const [results, total] = await this.protocolRepository.findAndCount({
      where: {
        ...protocolFilter,
        isDeleted: false,
        ...filterByStatus,
        status: statusFilter.status,
        ...sorting
      },
      ...paginationLimitSkip,
      relations: ['protocolFiles','meetings']
    }
    );
    
    const pagination = new Pagination({
      results,
      total
    })
    return pagination
  }

  // get protocol by ID
  public async findProtocolById() {
    //
  }

  // update protocol
  public async updateProtocol() {
    //
  }

  // delete protocol using id
  public async deleteProtocol() {
    //
  }

}