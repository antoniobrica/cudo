import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

const sasToken = process.env.storagesastoken || ""; // Fill string with your SAS token
const containerName = `tutorial-container`;
const storageAccountName = process.env.storageresourcename || ""; // Fill string with your Storage resource name

export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}

const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const returnedBlobUrls: string[] = [];

  for await (const blob of containerClient.listBlobsFlat()) {
 
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
}

const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
  
  const blobClient = containerClient.getBlockBlobClient(file.name);

  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  await blobClient.uploadBrowserData(file, options);
}

const uploadFileToBlob = async (file: File | null): Promise<string[]> => {
  if (!file) return [];

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const containerClient: ContainerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: 'container',
  });

  await createBlobInContainer(containerClient, file);

  return getBlobsInContainer(containerClient);
};

export default uploadFileToBlob;

