import React from 'react';

import './file-listing.module.scss';
import { FileStructure } from '@cudo/shared-components';
import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext, UploadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';
import { BlobItemUpload } from 'apps/mf-document-app/src/azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { BlobItem } from '@azure/storage-blob';
/* eslint-disable-next-line */
export interface FileListingProps { }

export function FileListing(props: FileListingProps) {
  const context = React.useContext(UploadsViewStateContext);
  const [items, setItems] = React.useState<BlobItemUpload[]>([]);
  const [loader, setLoader] = React.useState(false);
  const sharedContext = React.useContext(SharedViewStateContext);
  const downloadsContext = React.useContext(DownloadsViewStateContext);
  const deletesContext = React.useContext(DeletesViewStateContext);
  const [fileData, setFileData] = React.useState<BlobItem[]>([]);

  const getContainerItemsEffect = () => {
    setLoader(true);
    const sub = sharedContext.itemsInContainer$
      .pipe(tap(items => {
        setFileData(items);
        setLoader(false);
      }
      ))
      .subscribe();
    return () => sub.unsubscribe();
  };
  React.useEffect(getContainerItemsEffect, []);

  // const getUploadsEffect = () => {
  //   const sub = context.uploadedItems$
  //     .pipe(tap(items => setItems(items)))
  //     .subscribe();
  //   return () => sub.unsubscribe();
  // };
  // React.useEffect(getUploadsEffect, []);


  return (
    <div>
      {/* {items.map((item, i) => (
        <pre key={i}>{JSON.stringify(item, undefined, 2)}</pre>
      ))} */}
      {loader?
      <div>Loading</div>:
      <FileStructure files={fileData}></FileStructure>
      }
      
    </div>
  );
}

export default FileListing;
