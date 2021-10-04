import React, { useRef } from 'react';
import { useHistory } from 'react-router';

import { GET_FILES, GET_FILE_VERSIONS } from '../../graphql/graphql';
import { useFileQuery, useFileVersionQuery } from '../../services/useRequest';
import { AddPinFile, LazyLoading, LoaderPage } from "@cudo/shared-components";
import SelectFilePopup from 'libs/shared-components/src/lib/components/modal/selectfile';

import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext } from 'libs/mf-document-lib/src/azure-storage/contexts/viewStateContext';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { BlobItemDownload } from 'libs/mf-document-lib/src/azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { useQuery } from '@apollo/client';

/* eslint-disable-next-line */
export interface FileImageProps {
  file?
}

export function FileImage(props: FileImageProps) {
  // const [imgUrl, setImgUrl] = React.useState("")
  // const [fileVersion, setFileVersion] = React.useState(null);
  const sharedContext = React.useContext(SharedViewStateContext);
  const downloadsContext = React.useContext(DownloadsViewStateContext);
  const [fileName, setFileName] = React.useState('');
  const [itemsd, setItemsd] = React.useState<BlobItemDownload[]>([]);
  const [items, setItems] = React.useState<ContainerItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  // const viewContext = React.useContext(DownloadsViewStateContext);
  // const deletesContext = React.useContext(DeletesViewStateContext);
  // const [fileData, setFileData] = React.useState<BlobItem[]>([]);
  // const [addPinFromTask, setAddPinFromTask] = React.useState(false)

  // const [selectedFileId, setSelectedFileId] = React.useState(null)
  // const [selectedFileVersions, setSelectedFileVersions] = React.useState(null)
  // const [selectedFileFromTask, setSelectedFileFromTask] = React.useState(null)

  // const [isVersionSelected, setIsVersionSelected] = React.useState(false)

  const canvasImage = useRef<HTMLCanvasElement>();

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();

  const { loading, error, data } = useFileQuery(GET_FILES, { variables: { projectId } });

  const { loading: fileVersionLoading, error: fileVersionError, data: fileVersionData } = useQuery(GET_FILE_VERSIONS, {
    variables: { projectId, fileId: props?.file?.uploadedFileID },
  });

  React.useEffect(() => {
    if (props?.file?.uploadedFileID) {
      if (data) {
        data?.uploadedFiles?.forEach(file => {
          file?.children?.forEach(child => {
            if (child.uploadedFileID === props?.file?.uploadedFileID) {
              getViewItems()
              // setSelectedFileFromTask(child)
              // setAddPinFromTask(true)
              viewFiles(child)
            }
          })
        })
      }

      if (fileVersionData) {
        getViewItems()
        // setSelectedFileFromTask(child)
        // setAddPinFromTask(true)
        viewFiles(fileVersionData?.fileVersions)
      }
    }
  }, [data, fileVersionData])

  React.useEffect(() => {
    if (itemsd) {
      for (let i = 0; i < itemsd.length; i++) {
        if (itemsd[i].filename == props.file.fileTitle) {
          const imgUrl = itemsd[i].url;
          if (imgUrl) {
            const imgagDraw = new Image();
            imgagDraw.src = imgUrl;
            imgagDraw.onload = function () {
              const canvasImageElement = canvasImage.current
              // setLoading(false)
              canvasImageElement.width = canvasImageElement.clientWidth
              canvasImageElement.height = canvasImageElement.clientHeight
              const hRatio = canvasImage.current.clientWidth / imgagDraw.width;
              const vRatio = canvasImage.current.clientHeight / imgagDraw.height;
              const ratio = Math.min(hRatio, vRatio);

              const canvasImageContext = canvasImageElement.getContext('2d')
              canvasImageContext.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
            }
            // setLoading(false)
          }
        }
      }
    }
  }, [itemsd])


  // React.useEffect(() => {
  //   setAddPinFromTask(true)
  // },[selectedFileFromTask])




  // React.useEffect(() => {
  //   if (fileVersionData) {
  //     setSelectedFileVersions(fileVersionData)
  //   }
  // }, [fileVersionData]);

  // const getDownloadedItems = () => {
  //   setIsLoading(true)
  //   const sub = downloadsContext.downloadedItems$
  //     .pipe(tap(items => {
  //       setItemsd(items)
  //       for (let i = 0; i < items.length; i++) {
  //         if (items[i].url != '') {
  //           setIsLoading(false)
  //         }
  //       }
  //     }

  //     ))
  //     .subscribe();
  //   setIsLoading(false)

  //   return () => sub.unsubscribe();
  // };
  // React.useEffect(getDownloadedItems, []);

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

  // const downloadFiles = (data) => {
  //   setFileName(data);
  //   downloadsContext.downloadItem(data)
  // }

  const viewFiles = (data) => {

    setFileName(data.fileTitle);
    downloadsContext.viewItem(data.fileTitle)
  }

  // const uploadNewVersion = (data) => {

  //   setFileVersion(data);
  //   //setOpenNew(true)
  // }

  // const savePins = (data) => {
  //   console.log('savePins==>', data);

  // }
  // const cancel = () => {
  //   //setOpenNew(false)
  // }

  // const getSelectedFileId = (fileId) => {
  //   setSelectedFileId(fileId)
  // }
  // const cancel = () => {
  //   setAddPinFromTask(false)
  //   // props.cancel()
  // }

  // const getIsVersionSelected = (isSelected) => {
  //   setIsVersionSelected(isSelected)
  // }

  // if (loading) {
  //   return (<LazyLoading />)
  // }
  return (
    <div className="left-side-image-canvas">
      <div className="outsideWrapper">
        <div className="insideWrapper">
          {
            loading ? <LazyLoading /> : (
              <canvas id="canvasImage" className="coveringCanvas"
                width="800" height="700"
                ref={canvasImage}></canvas>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default FileImage;
