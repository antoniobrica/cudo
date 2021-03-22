import { Module } from '@nestjs/common';
import { BlobStorage } from './dto/blobstorageClass/blobstorage';
import { BlobResolver } from './resolver/blob.resolver';
import { SasGeneratorService } from './service/blob.service';


@Module({
    providers: [
      SasGeneratorService, BlobResolver, BlobStorage,
      {
        provide: 'BlobAccountName',
        useValue: 'cudo',
        // useValue: process.env.ACCOUNT
      },
      {
        provide: 'BlobAccountKey',
        useValue: "Xi83bV7FEEla3tMlk0v7FInFP/Zs0kjnFoKtKqDPdiAV/61+pTdRhrZh5H5Wd5vQheXoKwucrREtuTOjtWLp6w==",
        // useValue: process.env.ACCOUNT_KEY
      }
    ],
    exports: [SasGeneratorService, BlobStorage],
  })
  export class BlobModule {}
