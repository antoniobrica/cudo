import { Module } from '@nestjs/common';
import { BkpModule } from './bkp/bkp.module';
import { CountryModule } from './country/country.module';
import { FileModule } from './file/file.module';
import { FileStructureModule } from './fileStructure/filestructure.module';
import { FileTypeModule } from './filetype/filetype.module';
import { FolderModule } from './folder/folder.module';
import { PhaseModule } from './Phase/phase.module';
import { ReferenceModule } from './reference/reference.module';
import { UsersModule } from './users/users.module';

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
    FolderModule
  ],
  providers: []
})
export class ComponentsModule { }
