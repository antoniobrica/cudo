import { Module } from '@nestjs/common';
import { BlobModule } from './blobStorage/blob.module';
import { FileModule } from './file/file.module';
import { PinsModule } from './pins/pins.module';
import { CommentsModule } from './comments/comments.module';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [
    ReferenceModule,
    BlobModule,
    FileModule,
    PinsModule,
    CommentsModule
  ],
  providers: []
})
export class ComponentsModule { }
