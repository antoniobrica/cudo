import React from 'react';

import './file-listing.module.scss';
import { FileStructure } from '@cudo/shared-components';
import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext, UploadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';
import { BlobItemDownload, BlobItemUpload } from 'apps/mf-document-app/src/azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { LoaderPage, UploadNewVersion } from "@cudo/shared-components"
import { useFileQuery } from '../../services/useRequest';
import { GET_FILES } from '../../graphql/graphql';
import ItemsDownloaded from 'apps/mf-document-app/src/azure-storage/components/ItemsDownloaded';

/* eslint-disable-next-line */
export interface FileListingProps { }

export function FileListing(props: FileListingProps) {
  const context = React.useContext(UploadsViewStateContext);
  // const [items, setItems] = React.useState<BlobItemUpload[]>([]);
  const [loader, setLoader] = React.useState(true);
  const [openNew, setOpenNew] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [fileVersion, setFileVersion] = React.useState(null);
  const sharedContext = React.useContext(SharedViewStateContext);
  const downloadsContext = React.useContext(DownloadsViewStateContext);
  // const viewContext = React.useContext(DownloadsViewStateContext);
  const deletesContext = React.useContext(DeletesViewStateContext);
  const [fileData, setFileData] = React.useState<BlobItem[]>([]);
  const { loading, error, data } = useFileQuery(GET_FILES);
  const [items, setItems] = React.useState<ContainerItem[]>([]);
  const [itemsd, setItemsd] = React.useState<BlobItemDownload[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getDownloadedItems = () => {
    setIsLoading(true)
    const sub = downloadsContext.downloadedItems$
      .pipe(tap(items => {
        setItemsd(items)
        for (let i = 0; i < items.length; i++) {
          if (items[i].url != '') {
            setIsLoading(false)
          }
        }
      }

      ))
      .subscribe();
    setIsLoading(false)

    return () => sub.unsubscribe();
  };
  React.useEffect(getDownloadedItems, []);

  const getViewItems = () => {
    const sub = downloadsContext.viewItems$
      .pipe(tap(items => {
        setItemsd(items)
      }
      ))
      .subscribe();
    return () => sub.unsubscribe();
  };
  React.useEffect(getViewItems, []);


  const getContainersEffect = () => {
    setItems([{ name: "test" }] as ContainerItem[])
    sharedContext.getContainerItems("test");
    return
  };
  React.useEffect(getContainersEffect, []);

  const downloadFiles = (data) => {
    setFileName(data);
    downloadsContext.downloadItem(data)
  }

  const viewFiles = (data) => {
    setFileName(data);
    downloadsContext.viewItem(data)
  }

  const uploadNewVersion = (data) => {
    console.log('data', data);
    setFileVersion(data);
    setOpenNew(true)
  }
  const cancel = () => {
    setOpenNew(false)
  }

  // console.log('isLOading', isLoading);

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
          {openNew ?
            <UploadNewVersion
              opennewF={true}
              cancel={cancel}
              file={fileVersion} /> : null}
          <FileStructure files={data?.uploadedFiles} downloadFiles={downloadFiles} viewFiles={viewFiles} uploadNewVersion={uploadNewVersion} downloadedImg={itemsd}></FileStructure>
          {/* {itemsd.map((item, i) => (
            <div key={i}>
              {item.containerName}:
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.filename}
              </a>
            </div>
          ))} */}
        </div>
      }

    </div>
  );
}

export default FileListing;
