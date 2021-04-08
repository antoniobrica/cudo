import { Module } from '@nestjs/common';
import { BlobModule } from './blobStorage/blob.module';
import { FileModule } from './file/file.module';
import { FileVersionModule } from './fileVersion/fileversion.module';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [
    ReferenceModule,
    BlobModule,
    FileModule,
    FileVersionModule],
  providers: []
})
export class ComponentsModule { }
