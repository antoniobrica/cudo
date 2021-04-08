import { Module } from '@nestjs/common';
import { BlobModule } from './blobStorage/blob.module';
import { FileModule } from './file/file.module';
import { FileTypeModule } from './filetype/filetype.module';
import { FileVersionModule } from './fileVersion/fileversion.module';
import { PeopleModule } from './people/people.module';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [
    ReferenceModule,
    BlobModule,
    FileModule,
    FileVersionModule,
    FileTypeModule],
  providers: []
})
export class ComponentsModule { }
