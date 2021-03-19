import { Module } from '@nestjs/common';
import { SasGeneratorService } from './blob.service';
import { BlobResolver } from './blob.resolver';
import { BlobStorage } from './blobstorage';


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
