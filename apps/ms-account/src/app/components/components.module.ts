import { Module } from '@nestjs/common';
import { BkpModule } from './bkp/bkp.module';
import { StructureModule } from './project_structure/structure.module';
import { CountryModule } from './country/country.module';
import { FileModule } from './file/file.module';
import { FileStructureModule } from './fileStructure/filestructure.module';
import { FileTypeModule } from './filetype/filetype.module';
import { FolderModule } from './folder/folder.module';
import { InvitationTemplateModule } from './invitation_tamplate/invitation.tamplate.module';
import { MeetingCatagoryModule } from './meeting_catagory/meeting.catagory.module';
import { PhaseModule } from './Phase/phase.module';
import { ProtocolTemplateModule } from './protocol_template/meeting.catagory.module';
import { ReferenceModule } from './reference/reference.module';
import { UsersModule } from './users/users.module';
import { WorkTypesModule } from './workTypes/workTypes.module';
import { AllModule } from './all/all.module';

@Module({
  imports: [
    ReferenceModule,
    CountryModule,
    BkpModule,
    UsersModule,
    PhaseModule,
    FileModule,
    FileTypeModule,
    FileStructureModule,
    FolderModule,
    MeetingCatagoryModule,
    InvitationTemplateModule,
    StructureModule,
    ProtocolTemplateModule,
    WorkTypesModule,
    AllModule
  ],
  providers: []
})
export class ComponentsModule { }
