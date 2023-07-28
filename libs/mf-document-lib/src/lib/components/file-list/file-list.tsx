import React from 'react';
import { useHistory } from 'react-router';

import { GET_FILES, GET_FILE_VERSIONS } from '../../graphql/graphql';
import { useFileQuery, useFileVersionQuery } from '../../services/useRequest';
import { AddPinFile, LazyLoading, LoaderPage } from "@cudo/shared-components";
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
  onlyAddFileToTask?
  addSelectedFiles?
  selectedFiles?
  taskData?
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
  const [addPinFromTask, setAddPinFromTask] = React.useState(false)

  const [selectedFileId, setSelectedFileId] = React.useState(null)
  const [selectedFileVersions, setSelectedFileVersions] = React.useState(null)
  const [selectedFileFromTask, setSelectedFileFromTask] = React.useState(null)

  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();

  const { loading, error, data } = useFileQuery(GET_FILES, { variables: { projectId } });

  const { loading: fileVersionLoading, error: fileVersionError, data: fileVersionData } = useFileVersionQuery(GET_FILE_VERSIONS, {
    variables: { projectId, fileId: selectedFileId },
  });

  React.useEffect(() => {
    if (props?.taskData?.fileID) {
      data?.uploadedFiles?.forEach(file => {
        file?.children?.forEach(child => {
          if (child.uploadedFileID === props?.taskData?.fileID) {
            getViewItems()
            setSelectedFileFromTask(child)
            setAddPinFromTask(true)
            viewFiles(child)
          }
        })
      })
    }


  }, [data])

  // React.useEffect(() => {
  //   setAddPinFromTask(true)
  // },[selectedFileFromTask])




  React.useEffect(() => {
    if (fileVersionData) {
      setSelectedFileVersions(fileVersionData)
    }
  }, [fileVersionData]);

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

    setFileName(data.fileTitle);
    downloadsContext.viewItem(data.fileTitle)
  }

  const uploadNewVersion = (data) => {

    setFileVersion(data);
    //setOpenNew(true)
  }

  const savePins = (data) => {
    console.log('savePins==>', data);

  }
  // const cancel = () => {
  //   //setOpenNew(false)
  // }

  const getSelectedFileId = (fileId) => {
    setSelectedFileId(fileId)
  }
  const cancel = () => {
    setAddPinFromTask(false)
    props.cancel()
  }


  // if (loading) {
  //   return (<LazyLoading />)
  // }
  return (
    <div>
      {
      loading ?
        <LazyLoading />
        :
        addPinFromTask ? (
          <AddPinFile isOpen={addPinFromTask} cancel={cancel} filesData={selectedFileFromTask} dowloadFilesData={itemsd} savePin={savePins} />
        ) : (
          <SelectFilePopup
            isTaskFile={props.isTaskFile}
            cancel={props.cancel}
            files={data?.uploadedFiles}
            downloadFiles={downloadFiles}
            viewFiles={viewFiles}
            downloadedImg={itemsd}
            savePins={savePins}
            selectedFileId={getSelectedFileId}
            fileVersionDetail={selectedFileVersions?.fileVersions}
            fileVersionLoading={fileVersionLoading}
            onlyAddFileToTask={props.onlyAddFileToTask}
            addSelectedFiles={props.addSelectedFiles}
            selectedFiles={props.selectedFiles}
          />
        )
      }

    </div>
  );
}

export default FileList;
