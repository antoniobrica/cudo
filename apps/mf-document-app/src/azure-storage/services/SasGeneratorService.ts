import { Axios } from 'axios-observable';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobStorageRequest } from '../types/azure-storage';

export class SasGeneratorService {
  public getSasToken(): Observable<BlobStorageRequest> {
    console.log('sas token')
    const mocked: BlobStorageRequest = {
      storageUri: "https://cudo.blob.core.windows.net",
      storageAccessToken: "sv=2019-02-02&spr=https%2Chttp&st=2021-03-19T06%3A11%3A55Z&se=2021-03-19T06%3A13%3A22Z&sip=0.0.0.0-255.255.255.255&sr=c&sp=racwdl&sig=IkW8KG2psFCzsoZ3RQ2VAyXoE23jJTRt8EZ7H2B6cGM%3D"
    }
    return of(mocked);
  }
 
  // getSasToken(): Observable<BlobStorageRequest> {
  //    return Axios.get<BlobStorageRequest>(
  //     'https://stottle-blob-storage-api.azurewebsites.net/api/GenerateSasToken'
  //   ).pipe(map(
  //      res => res.data
  //     ));
  // }
}
