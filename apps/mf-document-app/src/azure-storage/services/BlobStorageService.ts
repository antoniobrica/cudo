import { TransferProgressEvent } from '@azure/core-http';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import axios from 'axios';
import { from, Observable, Subscriber } from 'rxjs';
import { distinctUntilChanged, scan, startWith } from 'rxjs/operators';
import { GET_TOKEN } from '../../app/graphql/graphql';
import { useTokenQuery } from '../../app/services/useRequest';
import {
  BlobContainerRequest,
  BlobFileRequest,
  BlobStorageRequest
} from '../types/azure-storage';

export class BlobStorageService {
  getContainers(request: BlobStorageRequest) {
    const blobServiceClient = this.buildClient(request);
    return this.asyncToObservable(blobServiceClient.listContainers());
  }

  listBlobsInContainer(request: BlobContainerRequest) {
    const containerClient = this.getContainerClient(request);
    return this.asyncToObservable(containerClient.listBlobsFlat());
  }

  downloadBlobItem(request: BlobFileRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return from(blockBlobClient.download());
  }

  deleteBlobItem(request: BlobFileRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return from(blockBlobClient.delete());
  }

  uploadToBlobStorage(file: File, request: BlobFileRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return this.uploadFile(blockBlobClient, file);
  }

  private getBlockBlobClient(request: BlobFileRequest) {
    const containerClient = this.getContainerClient(request);
    return containerClient.getBlockBlobClient(request.filename);
  }

  private getContainerClient(request: BlobContainerRequest) {
    const blobServiceClient = this.buildClient(request);
    return blobServiceClient.getContainerClient(request.containerName);
  }

  private buildClient(options: BlobStorageRequest) {
    return BlobServiceClient.fromConnectionString(
      this.buildConnectionString(options)
    );
  }

  private uploadFile(blockBlobClient: BlockBlobClient, file: File) {
    // console.log('file>',file);
    
    return new Observable<number>(observer => {
      blockBlobClient
        .uploadBrowserData(file, {
          onProgress: this.onProgress(observer),
          blobHTTPHeaders: {
            blobContentType: file.type
          }
        })
        .then(
          this.onUploadComplete(observer, file),
          this.onUploadError(observer)
        );
    }).pipe(distinctUntilChanged());
  }

  private onUploadError(observer: Subscriber<number>) {
    return (error: any) => observer.error(error);
  }

  private onUploadComplete(observer: Subscriber<number>, file: File) {
    return () => {
      observer.next(file.size);
      observer.complete();
    };
  }

  private onProgress(observer: Subscriber<number>) {
    return (progress: TransferProgressEvent) =>
      observer.next(progress.loadedBytes);
  }

  private asyncToObservable<T, TService>(
    iterable: PagedAsyncIterableIterator<T, TService>
  ) {
    return new Observable<T>(
      observer =>
        void (async () => {
          try {
            for await (const item of iterable as AsyncIterable<T>) {
              if (observer.closed) return;
              observer.next(item);
            }
            observer.complete();
          } catch (e) {
            observer.error(e);
          }
        })()
    ).pipe(
      scan<T, T[]>((items, item) => [...items, item], []),
      startWith([] as T[])
    );
  }

  private buildConnectionString = (options) => {
    return (
      // `BlobEndpoint=https://cudo.blob.core.windows.net/;SharedAccessSignature=sv=2019-02-02&ss=b&srt=sco&spr=https%2Chttp&st=2021-03-22T09%3A06%3A45Z&se=2021-03-22T11%3A30%3A45Z&sip=0.0.0.0-255.255.255.255&sp=rwdlacup&sig=jQgVAf%2B%2B%2BdGRI1kR%2BGiI%2Fg5cNSnEaPQV1p3rteTRMls%3D`
      `BlobEndpoint=https://cudo.blob.core.windows.net/;` +
      `SharedAccessSignature=${options.data.accountSASToken}`
    );
  };
}
