import { Module } from '@nestjs/common';
import { BlobModule } from './blobStorage/blob.module';
import { FileModule } from './file/file.module';
import { FileStructureModule } from './filestructure/filestructure.module';
import { FileUserModule } from './fileuser/fileuser.module';
import { FileVersionModule } from './fileVersion/fileversion.module';
import { FolderModule } from './folder/phases.module';
import { ProjectFileModule } from './projectfiles/projectfile.module';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [
    ReferenceModule,
    BlobModule,
    FileModule,
    ProjectFileModule,
    FileStructureModule,
    FileUserModule,
    FileVersionModule,
    FolderModule ],
  providers: []
})
export class ComponentsModule { }
