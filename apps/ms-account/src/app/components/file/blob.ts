// import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';
var azure = require('azure-storage');

module.exports = function(context, req) {
    if (req.body.container) {

        context.res = generateSasToken(context, req.body.container, req.body.blobName, req.body.permissions);
    } else {
        context.res = {
            status: 400,
            body: "Specify a value for 'container'"
        };
    }
    
    context.done();
};

function generateSasToken(context, container, blobName, permissions) {
    var connString = process.env.AzureWebJobsStorage;
    var blobService = azure.createBlobService(connString);

    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);

    permissions = permissions || azure.BlobUtilities.SharedAccessPermissions.READ;

    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    };
    
    var sasToken = blobService.generateSharedAccessSignature(container, blobName, sharedAccessPolicy);
    
    return {
        token: sasToken,
        uri: blobService.getUrl(container, blobName, sasToken, true)
    };
}

// startsOn: new Date().setMinutes(new Date().getMinutes() - 5),
// expiresOn: new Date().setMinutes(new Date().valueOf() + 60),