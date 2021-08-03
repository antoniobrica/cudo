import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MeetingEntity from "../../../entities/meeting.entity";
import ProtocolFileEntity from "../../../entities/protocol-file.entity";
import ProtocolEntity from "../../../entities/protocol.entity";
import { MeetingService } from "../../meeting/service/meeting.service";
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
  public async findProtocolList():Promise<ProtocolEntity[]> {
    const result = await this.protocolRepository.find()
    console.log(result)
    return result
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