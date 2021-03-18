import { Axios } from 'axios-observable';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobStorageRequest } from '../types/azure-storage';

export class SasGeneratorService {
  public getSasToken(): Observable<BlobStorageRequest> {
    console.log('sas token')
    const mocked: BlobStorageRequest = {
      storageUri: "https://cudo.blob.core.windows.net",
      storageAccessToken: "sv=2020-06-12&st=2021-03-18T11%3A04%3A57Z&se=2021-03-18T11%3A06%3A23Z&sr=b&sp=racwd&sig=2FSuS8NtQG2VZdDP0SSiAxhi8nlIZKYOs5Jft28p51c%3D"
    }
    return of(mocked);
  }
 
  // getSasToken(): Observable<BlobStorageRequest> {
  //    return Axios.get<BlobStorageRequest>(
  //     `https://cudo.blob.core.windows.net/api/${TOKEN}`
  //   ).pipe(map(
  //      res => res.data
  //     ));
  // }
}
