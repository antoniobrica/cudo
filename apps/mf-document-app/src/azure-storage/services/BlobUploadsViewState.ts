import { from, OperatorFunction, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BlobContainerRequest, BlobItemUpload } from '../types/azure-storage';
import { BlobSharedViewStateService } from './BlobSharedViewState';
import { BlobStorageService } from './BlobStorageService';

export class BlobUploadsViewStateService {
  private uploadQueueInner$ = new Subject<FileList>();

  uploadedItems$ = this.uploadQueue$.pipe(
    mergeMap(file => this.uploadFile(file)),
    this.blobState.scanEntries()
  );

  get uploadQueue$() {
    return this.uploadQueueInner$
      .asObservable()
      .pipe(mergeMap(files => from(files)));
  }

  constructor(
    private blobStorage: BlobStorageService,
    private blobState: BlobSharedViewStateService
  ) { }

  uploadItems(files: FileList): void {
    this.uploadQueueInner$.next(files);
  }

  private uploadFile = (file: File) =>{
    const filename = file.name + new Date().getTime();
    console.log('filename', filename);
    
    return this.blobState.getStorageOptionsWithContainer().pipe(
      switchMap(options => {
        return this.blobStorage
          .uploadToBlobStorage(file, {
            ...options,
            filename: filename
          })
          .pipe(
            this.mapUploadResponse(file,filename, options),
            this.blobState.finaliseBlobChange(options.containerName)
          )
      }
      )
    );
    }
  private mapUploadResponse = (
    file: File,
    filename,
    options: BlobContainerRequest
  ): OperatorFunction<number, BlobItemUpload> => source =>
      source.pipe(
        map(progress => ({
          filename: filename,
          containerName: options.containerName,
          type: file.type,
          progress: parseInt(((progress / file.size) * 100).toString(), 10)
        })),
        startWith({
          filename: filename,
          containerName: options.containerName,
          type: file.type,
          progress: 0
        })
      );
}
