import { BlobDownloadResponseModel } from '@azure/storage-blob';
import { from, OperatorFunction, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BlobContainerRequest, BlobItemDownload } from '../types/azure-storage';
import { BlobSharedViewStateService } from './BlobSharedViewState';
import { BlobStorageService } from './BlobStorageService';

export class BlobDownloadsViewStateService {
  private downloadQueueInner$ = new Subject<string>();

  downloadedItems$ = this.downloadQueue$.pipe(
    mergeMap(filename => this.downloadFile(filename)),
    this.blobState.scanEntries()
  );

  get downloadQueue$() {
    return this.downloadQueueInner$.asObservable();
  }

  constructor(
    private blobStorage: BlobStorageService,
    private blobState: BlobSharedViewStateService
  ) {}

  downloadItem(filename: string): void {
    console.log('filename',filename);
    
    this.downloadQueueInner$.next(filename);
  }

  private downloadFile = (filename: string) =>
  {
    console.log('filename2', filename);
    return this.blobState.getStorageOptionsWithContainer().pipe(
      switchMap(options =>
        this.blobStorage
          .downloadBlobItem({
            ...options,
            filename
          })
          .pipe(
            this.getDownloadUrlFromResponse(),
            this.mapDownloadResponse(filename, options)
          )
      )
    );
          }
  private mapDownloadResponse = (
    filename: string,
    options: BlobContainerRequest
  ): OperatorFunction<string, BlobItemDownload> => source =>
    source.pipe(
      map(url => ({
        filename,
        containerName: options.containerName,
        url
      })),
      startWith({
        filename,
        containerName: options.containerName,
        url: ''
      })
    );

  private getDownloadUrlFromResponse = (): OperatorFunction<
    BlobDownloadResponseModel,
    string
  > => source =>
    source.pipe(
      switchMap(res =>
        from(res.blobBody ? res.blobBody : Promise.resolve({})).pipe(
          map(body => window.URL.createObjectURL(body))
        )
      )
    );
}
