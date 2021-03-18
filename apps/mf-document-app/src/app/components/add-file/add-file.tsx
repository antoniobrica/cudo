import React, { useContext, useRef } from 'react';
import './add-file.module.scss';
import ModalAddPrint from 'libs/shared-components/src/lib/components/modal/addfile';
import FileSetting from './file-setting'
import uploadFileToBlob, { isStorageConfigured } from './azure-storage-blob';
import InputFile from 'apps/mf-document-app/src/azure-storage/components/InputFile';
import ItemsUploaded from 'apps/mf-document-app/src/azure-storage/components/ItemsUploaded';
import ContainerList from 'apps/mf-document-app/src/azure-storage/components/ContainerList';
import SelectedContainer from 'apps/mf-document-app/src/azure-storage/components/SelectedContainer';
import ItemsList from 'apps/mf-document-app/src/azure-storage/components/ItemsList';
import ItemsDownloaded from 'apps/mf-document-app/src/azure-storage/components/ItemsDownloaded';
import ItemsDeleted from 'apps/mf-document-app/src/azure-storage/components/ItemsDeleted';
import { SharedViewStateContext, UploadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';

/* eslint-disable-next-line */
export interface AddFileProps { }

export function AddFile(props: AddFileProps) {

  // const [blobList, setBlobList] = React.useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = React.useState(null);

  // UI/form management
  // const [uploading, setUploading] = React.useState(false);
  const [open, setOpen] = React.useState(false)

  // const [inputKey, setInputKey] = React.useState(Math.random().toString(36));
  const context1 = useContext(UploadsViewStateContext);
  const context2 = useContext(SharedViewStateContext);

  const inputFileRef = useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    onContainerClick();
  }, [!open]);

  const onContainerClick = () => {
    console.log('getContainerItems')
    context2.getContainerItems('test');
  }
  const onFile = (data) => {
    onContainerClick
    console.log('uploaded file', data)
    // capture file into state
    setFileSelected(data);
  };

  const openSetting = () => {
    console.log('setting==')
    setOpen(true)
  }
  const onFileUpload = async () => {
    fileSelected && context1.uploadItems(fileSelected);
  }
  // const onFileUpload = async () => {
  //   console.log('onFileUpload',fileSelected)
  //   // prepare UI
  //   setUploading(true);

  //   const blobsInContainer: string[] = await uploadFileToBlob(fileSelected);

  //   // prepare UI for results
  //   setBlobList(blobsInContainer);

  //   // reset state/form
  //   setFileSelected(null);
  //   setUploading(false);
  //   setInputKey(Math.random().toString(36));
  // };
  return (
    <div>
      <InputFile />
      <ItemsList />
      {/* <div className="item-details">
        <ItemsUploaded />
        <ItemsDownloaded />
        <ItemsDeleted />
      </div> */}
      {open ?
        <div style={{ marginLeft: 900 }} >
          <FileSetting openSettingF={open} ></FileSetting>
        </div>
        :
        <div style={{ marginLeft: 900 }} >
          <ModalAddPrint fileData={onFile} onFileSubmit={onFileUpload} setting={openSetting}></ModalAddPrint>
        </div>

      }
    </div>
  );
}

export default AddFile;
