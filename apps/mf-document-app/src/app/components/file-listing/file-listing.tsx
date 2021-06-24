import React from 'react';

import './file-listing.module.scss';
import { FileStructure } from '@cudo/shared-components';
import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext, UploadsViewStateContext } from './../../../azure-storage/contexts/viewStateContext';
import { BlobItemDownload, BlobItemUpload } from './../../../azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { LoaderPage, UploadNewVersion, AddPinFile } from "@cudo/shared-components"
import { useFileQuery } from '../../services/useRequest';
import { GET_FILES, UPLOAD_FILE_VERSION } from '../../graphql/graphql';
import ItemsDownloaded from './../../../azure-storage/components/ItemsDownloaded';
import { useMutation } from '@apollo/react-hooks';
import { IFiles } from '../../interfaces/document';

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
  const [openPinFile, setOpenPinFile] = React.useState(false)
  const [imgUrl, setimgUrl] = React.useState('');
  const [filesData, setFilesData] = React.useState([]);
  const [addFile, { data: neVersionDta }] = useMutation(UPLOAD_FILE_VERSION,
    {
      refetchQueries: [
        { query: GET_FILES }
      ]
    }
  )

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
  const addPinTask = (data) => {
    setFileName(data);
    downloadsContext.viewItem(data)
  }
  const cancel = () => {
    setOpenNew(false)
  }

  const uploadNewVersionFile = (data) => {
    console.log('data-==>', data);
    setOpenNew(false)
    addFile({
      variables: {
        parentUploadedFileID: data.parentUploadedFileID,
        structureID: data.structureID,
        structureTitle: data.structureTitle,
        BKPID: data.BKPID,
        BKPIDTitle: data.BKPIDTitle,
        phaseID: data.phaseID,
        phaseName: data.phaseName,
        generateFileName: true,
        fileTypeID: data.fileTypeID,
        fileTypeName: data.fileTypeName,
        isEveryOneAllowed: true,
        fileURL: data.fileURL,
        fileTitle: data.fileTitle,
        fileType: data.fileType,
        fileVersion: 2,
        isDeleted: false,
        // peoples: data.peoples,
        directory: data.directory
      },
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({ query: GET_FILES }) as IFiles;
        cache.writeQuery({
          query: GET_FILES,
          data: {
            tasks: [...cacheData.uploadedFiles, data['createFile']]
          }
        });
      }
    });

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
              uploadNewVersion={uploadNewVersionFile}
              file={fileVersion} /> : null}
          <FileStructure files={data?.uploadedFiles} downloadFiles={downloadFiles} viewFiles={viewFiles}
            uploadNewVersion={uploadNewVersion}
            addPinTask={addPinTask}
            downloadedImg={itemsd}></FileStructure>
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
