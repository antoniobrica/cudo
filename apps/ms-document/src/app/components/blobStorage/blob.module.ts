import { SecretService } from '@cudo/ms-core';
import { Module } from '@nestjs/common';
import { SasGeneratorService } from '@cudo/ms-core';
import { BlobStorage } from '@cudo/ms-core';
import { BlobResolver } from './resolver/blob.resolver';


@Module({
  providers: [
    SasGeneratorService, BlobResolver, BlobStorage, SecretService
  ],
  exports: [SasGeneratorService, BlobStorage],
})
export class BlobModule { }
