import { Inject, Injectable } from '@nestjs/common';
import BlobParams from '../dto/blobparam';
import { BlobStorage } from '../dto/blobstorageClass/blobstorage';


@Injectable()
export class SasGeneratorService {  constructor(
    @Inject(BlobStorage) private blobstorage: BlobStorage) { }


    getAccountTolen() {
        return this.blobstorage.accountSAS;
    }

  async getSasObject(getContainer:BlobParams){
        const containerName =  this.blobstorage.blobServiceClient.getContainerClient(getContainer.containerName);
        const isExist = await containerName.exists()
           if (!isExist)
        {
          containerName.create()
        }
        console.log()
        return this.blobstorage.sasObject;
    }
}