import React, { useRef } from 'react';
import { useHistory } from 'react-router';

import { GET_FILES, GET_FILE_VERSIONS } from '../../graphql/graphql';
import { useFileQuery } from '../../services/useRequest';
import {  LazyLoading } from "@cudo/shared-components";
import { DownloadsViewStateContext, SharedViewStateContext } from 'libs/mf-document-lib/src/azure-storage/contexts/viewStateContext';
import { BlobItemDownload } from 'libs/mf-document-lib/src/azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { useQuery } from '@apollo/client';
import { Modal } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface FileImageProps {
  file?
  open?
  close?
}

export function FileImage(props: FileImageProps) {
  const [open, setOpen] = React.useState(false)
  const sharedContext = React.useContext(SharedViewStateContext);
  const downloadsContext = React.useContext(DownloadsViewStateContext);
  const [fileName, setFileName] = React.useState('');
  const [itemsd, setItemsd] = React.useState<BlobItemDownload[]>([]);
  // const [items, setItems] = React.useState<ContainerItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const canvasImage = useRef<HTMLCanvasElement>();

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();

  const { loading, error, data } = useFileQuery(GET_FILES, { variables: { projectId } });

  const { loading: fileVersionLoading, error: fileVersionError, data: fileVersionData } = useQuery(GET_FILE_VERSIONS, {
    variables: { projectId, fileId: props?.file?.uploadedFileID },
  });

  React.useEffect(() => {
    props.open && setOpen(props.open)
  }, [props.open])

  React.useEffect(() => {
    setIsLoading(true)
  }, [])

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
            setIsLoading(false)
          }
        }
      }
    }
  }, [itemsd])

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
    // setItems([{ name: "test" }] as ContainerItem[])
    sharedContext.getContainerItems("test");
    return
  };
  React.useEffect(getContainersEffect, []);

  const viewFiles = (data) => {

    setFileName(data.fileTitle);
    downloadsContext.viewItem(data.fileTitle)
  }

  const cancel = () => {
    setOpen(false)
    props.close()
  }

  if (isLoading) {
    return (<LazyLoading />)
  }

  return (
    <Modal
      className=" modal_center"
      closeIcon
      open={open}
      onClose={cancel}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content>
        {/* <div className="view-pin-detail-popup"> */}
        {/* <div className="left-side-detail-file"> */}
        <div className="outsideWrapper">
          <div className="insideWrapper">
            {
              // isLoading ? <LazyLoading /> : (
              <canvas id="canvasImage" className="coveringCanvas"
                width="800" height="700"
                ref={canvasImage}></canvas>
              // )
            }
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Modal.Content>
    </Modal>
  );
}

export default FileImage;
