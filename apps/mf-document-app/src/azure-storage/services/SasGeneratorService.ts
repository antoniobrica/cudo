import axios from 'axios';
import { Axios } from 'axios-observable';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_TOKEN } from '../../app/graphql/graphql';
import { useTokenQuery } from '../../app/services/useRequest';
import { BlobStorageRequest } from '../types/azure-storage';
import { MS_SERVICE_URL } from '@cudo/mf-core'
export class SasGeneratorService {

  getSasToken(): Observable<BlobStorageRequest> {
    console.log('sasstoken');

    return Axios.post<BlobStorageRequest>(
      MS_SERVICE_URL['ms_document'].url,
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
