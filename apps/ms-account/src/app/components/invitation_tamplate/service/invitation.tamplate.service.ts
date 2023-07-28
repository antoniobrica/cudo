import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { InvitationTemplateEntity } from '../../../entities/invitaion.templet.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateInvitationTemplateInput } from '../dto/create-invitation-tamplate.input';
import { UpdateInvitationTemplate } from '../dto/update-invitation.input';
import InvitationNotFoundException from '../exceptions/invitationNotFound.exception';


@Injectable()
export class InvitationTemplateService {
  constructor(
    @InjectRepository(InvitationTemplateEntity)
    private invitationTemplateRepository: Repository<InvitationTemplateEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createInvitationTemplate(createInput: CreateInvitationTemplateInput, referenceFilter: ReferenceFilterParams): Promise<InvitationTemplateEntity> {
    try {
      const catagoryDetails = new InvitationTemplateEntity({ ...createInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.invitationTemplateRepository.create({
        ...catagoryDetails,
        reference: { id: selectedReference.id }
      });
      await this.invitationTemplateRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateInvitationTemplate(updatefolder: UpdateInvitationTemplate, createinput: CreateInvitationTemplateInput): Promise<InvitationTemplateEntity> {
    const invitation = await this.invitationTemplateRepository.findOne({ where: { invitationTemplateID: updatefolder.invitationTemplateID } });
    if (invitation) {
      await this.invitationTemplateRepository.update(invitation.id, { ...createinput });
      const updatedPost = await this.invitationTemplateRepository.findOne(invitation.id);
      return updatedPost;
    }
    throw new InvitationNotFoundException(invitation.invitationTemplateID);
  }

  public async findAllInvitationTemplate(refFilter: ReferenceFilterParams): Promise<InvitationTemplateEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.invitationTemplateRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

  public async deleteInvitationTemplateByID(DeleteInput: UpdateInvitationTemplate): Promise<InvitationTemplateEntity[]> {
    const { invitationTemplateID } = DeleteInput;
    const catagoryDetails = await this.invitationTemplateRepository.delete({ invitationTemplateID: invitationTemplateID });
    const invitation = await this.invitationTemplateRepository.find({
        where: { invitationTemplateID: invitationTemplateID },
    });
    return invitation;
}

}