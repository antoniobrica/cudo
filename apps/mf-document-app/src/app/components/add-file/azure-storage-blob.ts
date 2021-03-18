import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

// THIS IS SAMPLE CODE ONLY - DON'T STORE TOKEN IN PRODUCTION CODE
const sasToken = "sv=2020-04-08&st=2021-03-16T10%3A57%3A17Z&se=2021-03-16T10%3A58%3A44Z&sr=b&sp=racwd&sig=ymLYxbSiQeOaxhscthIYm4UxTSa9dk0oSQ93qZhtJKo%3D"
const containerName = "test";
const storageAccountName = "cudo";  // Fill string with your Storage resource name

export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}

const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const returnedBlobUrls: string[] = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
}

const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
  console.log('createBlobInContainer',containerClient)
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);
console.log('blobClient ==>',blobClient)
  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
}
const uploadFileToBlob = async (file: File | null): Promise<string[]> => {
  if (!file) return [];
    console.log('uploadFileToBlob',file)
  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // get Container - full public read access
  const containerClient: ContainerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: 'container',
  });

  // upload file
  await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  return getBlobsInContainer(containerClient);
};

export default uploadFileToBlob;