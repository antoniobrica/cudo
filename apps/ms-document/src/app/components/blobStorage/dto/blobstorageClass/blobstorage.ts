import {BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions, AccountSASResourceTypes, generateAccountSASQueryParameters, AccountSASPermissions, AccountSASServices, SASProtocol, ContainerSASPermissions} from "@azure/storage-blob" 
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class BlobStorage {
    creds: StorageSharedKeyCredential;
    blobServiceClient: BlobServiceClient;
    containerName: string;
    client: any;
    blobName: string;
    blobClient: any;

    constructor(@Inject('BlobAccountName') accountName, @Inject('BlobAccountKey') accountKey) {
        this.creds = new StorageSharedKeyCredential(accountName, accountKey);
        this.blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net`,this.creds)

        this.client = this.blobServiceClient.getContainerClient(this.containerName)
        this.blobClient = this.client.getBlobClient(this.blobName)
  }

  get blobSAS() {
    const result = generateBlobSASQueryParameters({
      containerName: this.containerName,
      permissions: ContainerSASPermissions.parse("racwdl"), 
      startsOn: new Date(), // Optional
      expiresOn: new Date(new Date().valueOf() + 86400), 
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      protocol: SASProtocol.HttpsAndHttp, 
      version: "2019-02-02", 
        },
        this.creds
      ).toString();
      return result;
  }
  
  get sasUrl() {
      return this.blobServiceClient.url
    }

  get accountSAS(){
    const result  = generateAccountSASQueryParameters({
    startsOn: new Date(), 
    expiresOn: new Date(new Date().valueOf() + 8640000),
    ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
    permissions: AccountSASPermissions.parse("rwdlacup"),
    protocol: SASProtocol.HttpsAndHttp,
    resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
    services: AccountSASServices.parse("b").toString(),
    version: "2019-02-02",
    },this.creds).toString();
    return result
  }

  get sasObject() {
   const result = {sasUrl: `${this.sasUrl}`,blobSAS: `${this.blobSAS}`}
    return result
  }

}

