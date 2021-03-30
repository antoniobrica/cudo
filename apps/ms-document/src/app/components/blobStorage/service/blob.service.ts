import { Inject, Injectable } from '@nestjs/common';
import BlobParams from '../dto/blobparam';
import { BlobStorage } from '../dto/blobstorageClass/blobstorage';


@Injectable()
export class SasGeneratorService {
  constructor(
    @Inject(BlobStorage) private blobstorage: BlobStorage) { }

  getAccountTolen() {
    return this.blobstorage.accountSAS;
  }

  async getSasObject(getContainer: BlobParams) {
    const isExist = this.blobstorage.gisContainerExist(getContainer.containerName);
    if (!isExist) {
      this.blobstorage.blobServiceClient.getContainerClient(getContainer.containerName).create()
    }
    return this.blobstorage.sasObject;
  }
}