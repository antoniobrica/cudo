import React from 'react';

import './file-listing.module.scss';
import { FileStructure } from '@cudo/shared-components';
import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext, UploadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';
import { BlobItemUpload } from 'apps/mf-document-app/src/azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { BlobItem } from '@azure/storage-blob';
import { LoaderPage } from "@cudo/shared-components"
import { useFileQuery } from '../../services/useRequest';
import { GET_FILES } from '../../graphql/graphql';

/* eslint-disable-next-line */
export interface FileListingProps { }

export function FileListing(props: FileListingProps) {
  const context = React.useContext(UploadsViewStateContext);
  const [items, setItems] = React.useState<BlobItemUpload[]>([]);
  const [loader, setLoader] = React.useState(true);
  const sharedContext = React.useContext(SharedViewStateContext);
  const downloadsContext = React.useContext(DownloadsViewStateContext);
  const deletesContext = React.useContext(DeletesViewStateContext);
  const [fileData, setFileData] = React.useState<BlobItem[]>([]);
  const { loading, error, data } = useFileQuery(GET_FILES);

  // const getContainerItemsEffect = () => {
  //    setLoader(true);
  //    const sub = sharedContext.itemsInContainer$
  //     .pipe(tap(items => {
  //       setFileData(items)
  //       setLoader(false);
  //     }
  //     ))
  //     .subscribe();

  //   return () => sub.unsubscribe();
  // };
  // React.useEffect(getContainerItemsEffect, []);

  console.log('files query',data)


  return (
    <div>
      {loading?
      <LoaderPage />:
      <FileStructure files={data?.File}></FileStructure>
      }
      
    </div>
  );
}

export default FileListing;
