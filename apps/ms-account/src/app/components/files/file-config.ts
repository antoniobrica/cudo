const account = "cudo";
const accountKey =
  "Xi83bV7FEEla3tMlk0v7FInFP/Zs0kjnFoKtKqDPdiAV/61+pTdRhrZh5H5Wd5vQheXoKwucrREtuTOjtWLp6w==";
 
var storage = require("@azure/storage-blob");
const accountname = "blobstorage0516";
const key = "";
const cerds = new storage.StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new storage.BlobServiceClient(
  `https://${accountname}.blob.core.windows.net`,
  cerds
);
const containerName = "test";
const client = blobServiceClient.getContainerClient(containerName);
const blobName = "help.txt";
const blobClient = client.getBlobClient(blobName);
 
const blobSAS = storage
  .generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: storage.BlobSASPermissions.parse("racwd"),
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 86400),
    },
    cerds
  )
  .toString();
 
const sasUrl = blobClient.url + "?" + blobSAS;
console.log(blobSAS);
console.log(sasUrl);