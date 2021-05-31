import React from 'react';
import { GET_FILES } from '../../graphql/graphql';
import { useFileQuery } from '../../services/useRequest';
import { LoaderPage } from "@cudo/shared-components";
import SelectFilePopup from 'libs/shared-components/src/lib/components/modal/selectfile';

import './file-list.module.scss';
import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext } from 'libs/mf-document-lib/src/azure-storage/contexts/viewStateContext';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { BlobItemDownload } from 'libs/mf-document-lib/src/azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';

/* eslint-disable-next-line */
export interface FileListProps {
  isTaskFile,
  cancel
}

export function FileList(props: FileListProps) {
  const [fileVersion, setFileVersion] = React.useState(null);
  const sharedContext = React.useContext(SharedViewStateContext);
  const downloadsContext = React.useContext(DownloadsViewStateContext);
  // const viewContext = React.useContext(DownloadsViewStateContext);
  const [fileName, setFileName] = React.useState('');
  const deletesContext = React.useContext(DeletesViewStateContext);
  const [fileData, setFileData] = React.useState<BlobItem[]>([]);
  const [items, setItems] = React.useState<ContainerItem[]>([]);
  const [itemsd, setItemsd] = React.useState<BlobItemDownload[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { loading, error, data } = useFileQuery(GET_FILES);

  if (data) {
    console.log('files', data);

  }
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
    console.log('viewInSHaredDc', data);

    setFileName(data.fileTitle);
    downloadsContext.viewItem(data.fileTitle)
  }

  const uploadNewVersion = (data) => {
    console.log('data', data);
    setFileVersion(data);
    //setOpenNew(true)
  }
  // const cancel = () => {
  //   //setOpenNew(false)
  // }



  return (
    <div>
      {loading ?
        <LoaderPage /> : null}
      <SelectFilePopup isTaskFile={props.isTaskFile} cancel={props.cancel} files={data?.File}
        downloadFiles={downloadFiles} viewFiles={viewFiles} uploadNewVersion={uploadNewVersion} downloadedImg={itemsd}
      />
    </div>
  );
}

export default FileList;
