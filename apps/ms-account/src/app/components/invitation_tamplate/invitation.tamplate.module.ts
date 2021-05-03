import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationTemplateEntity } from '../../entities/invitaion.templet.entity';
import { ReferenceModule } from '../reference/reference.module';
import { InvitationTemplateResolver } from './resolver/invitation.resolver';
import { InvitationTemplateService } from './service/invitation.tamplate.service';


@Module({
  imports: [TypeOrmModule.forFeature([InvitationTemplateEntity]), ReferenceModule],
  providers: [InvitationTemplateResolver, InvitationTemplateService],
  exports: [InvitationTemplateResolver, InvitationTemplateService]
})
export class InvitationTemplateModule { }
