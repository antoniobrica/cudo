import { SecretService } from '@cudo/ms-core';
import { Module } from '@nestjs/common';
import { BlobStorage } from './dto/blobstorageClass/blobstorage';
import { BlobResolver } from './resolver/blob.resolver';
import { SasGeneratorService } from './service/blob.service';


@Module({
  providers: [
    SasGeneratorService, BlobResolver, BlobStorage, SecretService
  ],
  exports: [SasGeneratorService, BlobStorage],
})
export class BlobModule { }
