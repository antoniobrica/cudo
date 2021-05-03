import React from 'react';

import './file-listing.module.scss';
import { FileStructure } from '@cudo/shared-components';
import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext, UploadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';
import { BlobItemDownload, BlobItemUpload } from 'apps/mf-document-app/src/azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { LoaderPage } from "@cudo/shared-components"
import { useFileQuery } from '../../services/useRequest';
import { GET_FILES } from '../../graphql/graphql';
import ItemsDownloaded from 'apps/mf-document-app/src/azure-storage/components/ItemsDownloaded';

/* eslint-disable-next-line */
export interface FileListingProps { }

export function FileListing(props: FileListingProps) {
  const context = React.useContext(UploadsViewStateContext);
  // const [items, setItems] = React.useState<BlobItemUpload[]>([]);
  const [loader, setLoader] = React.useState(true);
  const sharedContext = React.useContext(SharedViewStateContext);
  const downloadsContext = React.useContext(DownloadsViewStateContext);
  const deletesContext = React.useContext(DeletesViewStateContext);
  const [fileData, setFileData] = React.useState<BlobItem[]>([]);
  const { loading, error, data } = useFileQuery(GET_FILES);
  const [items, setItems] = React.useState<ContainerItem[]>([]);
  const [itemsd, setItemsd] = React.useState<BlobItemDownload[]>([]);

  const getDownloadedItems = () => {
    const sub = downloadsContext.downloadedItems$
      .pipe(tap(items => setItemsd(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  React.useEffect(getDownloadedItems, []);

  const getContainersEffect = () => {
    setItems([{ name: "test" }] as ContainerItem[])
    sharedContext.getContainerItems("test");
    return
  };
  React.useEffect(getContainersEffect, []);

  const downloadFiles=(data)=>{
    downloadsContext.downloadItem(data)
  }
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



  return (
    <div>
      {loading ?
        <LoaderPage /> :
        <div>
        <FileStructure files={data?.File} downloadFiles={downloadFiles}></FileStructure>
        {itemsd.map((item, i) => (
        <div key={i}>
          {item.containerName}:
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.filename}
          </a>
        </div>
      ))}
        </div>
      }

    </div>
  );
}

export default FileListing;
