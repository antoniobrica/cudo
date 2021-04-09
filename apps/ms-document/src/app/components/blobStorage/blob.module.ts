import { SecretService } from '@cudo/ms-core';
import { Module } from '@nestjs/common';
import { BlobStorage } from 'libs/ms-core/src/lib/common/services/blobstorage/blobstorage';
import { BlobResolver } from './resolver/blob.resolver';
import { SasGeneratorService } from 'libs/ms-core/src/lib/common/services/blobstorage/blob.service';


@Module({
  providers: [
    SasGeneratorService, BlobResolver, BlobStorage, SecretService
  ],
  exports: [SasGeneratorService, BlobStorage],
})
export class BlobModule { }
