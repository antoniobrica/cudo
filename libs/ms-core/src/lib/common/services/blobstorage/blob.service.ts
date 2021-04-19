import { Inject, Injectable } from '@nestjs/common';
import { BlobParams } from './blobparam';
import { BlobStorage } from './blobstorage';



@Injectable()
export class SasGeneratorService {
  constructor(
    @Inject(BlobStorage) private blobstorage: BlobStorage) { }

  getAccountTolen() {
    return this.blobstorage.accountSAS;
  }

  async getSasObject(getContainer: BlobParams) {
    const isExist = this.blobstorage.isContainerExist(getContainer.containerName);
    if (!isExist) {
      this.blobstorage.blobServiceClient.getContainerClient(getContainer.containerName).create()
    }
    return this.blobstorage.blobSASObject;
  }
}