import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions, AccountSASResourceTypes, generateAccountSASQueryParameters, AccountSASPermissions, AccountSASServices, SASProtocol, ContainerSASPermissions } from "@azure/storage-blob"
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class BlobStorage {
  creds: StorageSharedKeyCredential;
  blobServiceClient: BlobServiceClient;
  containerName: string;
  client: any;
  blobName: string;
  blobClient: any;


  createInstance() {
    const accountName = process.env.ACCOUNT_NAME;
    const accountKey = process.env.ACCOUNT_KEY;
    if (!this.creds)
      this.creds = new StorageSharedKeyCredential(accountName, accountKey);
    if (!this.blobServiceClient) {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CON_STRING);
    }
  }
  get blobSASToken() {
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
    this.createInstance();
    this.client = this.blobServiceClient.getContainerClient(this.containerName)
    this.blobClient = this.client.getBlobClient(this.blobName)
    return this.blobServiceClient.url
  }

  get accountSAS() {
    this.createInstance();
    const result = generateAccountSASQueryParameters({
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 8640000),
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: AccountSASPermissions.parse("rwdlacup"),
      protocol: SASProtocol.HttpsAndHttp,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("b").toString(),
      version: "2019-02-02",
    }, this.creds).toString();
    return result
  }

  get blobSASObject() {
    this.createInstance();
    this.client = this.blobServiceClient.getContainerClient(this.containerName)
    this.blobClient = this.client.getBlobClient(this.blobName)
    const result = { sasUrl: `${this.sasUrl}`, blobSASToken: `${this.blobSASToken}` }
    return result
  }

  async isContainerExist(containerName) {
    this.createInstance();
    this.client = this.blobServiceClient.getContainerClient(containerName)
    this.blobClient = this.client.getBlobClient(this.blobName)
    const isExist = await this.client.exists()
    return isExist;
  }
}

