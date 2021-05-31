import axios from 'axios';
import { Axios } from 'axios-observable';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobStorageRequest } from '../types/azure-storage';

export class SasGeneratorService {

  getSasToken(): Observable<BlobStorageRequest> {
    console.log('sasstoken');

    return Axios.post<BlobStorageRequest>(
      'http://localhost:5003/graphql',
      {
        query: `
     {
      accountSASToken
      }
    `}
    ).pipe(map(
      res => res.data
    ))
    //  return Axios.get<BlobStorageRequest>(
    //   'https://stottle-blob-storage-api.azurewebsites.net/api/GenerateSasToken'
    // ).pipe(map(
    //    res => res.data
    //   ));

  }
}
