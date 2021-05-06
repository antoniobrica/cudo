import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { ProtocolEntity } from '../../../entities/protocol.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateProtocolInput } from '../dto/create-portocol.input';
import { UpdateProtocol } from '../dto/update-protocol.input';
import ProtocolNotFoundException from '../exceptions/protocolNotFound.exception';



@Injectable()
export class ProtocolTemplateService {
  constructor(
    @InjectRepository(ProtocolEntity)
    private protocolRepository: Repository<ProtocolEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createProtocol(createInput: CreateProtocolInput, referenceFilter: ReferenceFilterParams): Promise<ProtocolEntity> {
    try {
      const protocolDetails = new ProtocolEntity({ ...createInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.protocolRepository.create({
        ...protocolDetails,
        reference: { id: selectedReference.id }
      });
      await this.protocolRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateProtocol(update: UpdateProtocol, createinput: CreateProtocolInput): Promise<ProtocolEntity> {
    const protocol = await this.protocolRepository.findOne({ where: { protocolTemplateID: update.protocolTemplateID } });
    if (protocol) {
      await this.protocolRepository.update(protocol.id, { ...createinput });
      const updatedPost = await this.protocolRepository.findOne(protocol.id);
      return updatedPost;
    }
    throw new ProtocolNotFoundException(protocol.protocolTemplateID);
  }

  public async findAllProtocol(refFilter: ReferenceFilterParams): Promise<ProtocolEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.protocolRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

  public async deleteProtocolByID(DeleteInput: UpdateProtocol): Promise<ProtocolEntity[]> {
    const { protocolTemplateID } = DeleteInput;
    const protocolDetails = await this.protocolRepository.delete({ protocolTemplateID: protocolTemplateID });
    const protocol = await this.protocolRepository.find({
        where: { protocolTemplateID: protocolTemplateID },
    });
    return protocol;
}

}