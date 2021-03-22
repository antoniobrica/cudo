import React, { useContext, useRef } from 'react';
import './add-file.module.scss';
import ModalAddPrint from 'libs/shared-components/src/lib/components/modal/addfile';
import ProgressBar from 'libs/shared-components/src/lib/components/progress_bar/progressbar';
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
import { tap } from 'rxjs/operators';
import { ContainerItem } from '@azure/storage-blob';

export interface AddFileProps { }

export function AddFile(props: AddFileProps) {
  const [fileSelected, setFileSelected] = React.useState(null);
  const [items, setItems] = React.useState<ContainerItem[]>([]);

  const [open, setOpen] = React.useState(false)

  const context1 = useContext(UploadsViewStateContext);
  const context2 = useContext(SharedViewStateContext);

  const getContainersEffect = () => {
    console.log('getContainersEffect')
    setItems([{ name: "test" }] as ContainerItem[])
    context2.getContainerItems("test");
    return
  };
  React.useEffect(getContainersEffect, []);
  const onFile = (data) => {
    console.log('onFile', data)
    setFileSelected(data);
  };

  const openSetting = () => {
    setOpen(true)
  }
  const onFileUpload = async (file: FileList | null) => {
    console.log('fileSelected', file)
    fileSelected && context1.uploadItems(file);
  }
  
  return (
    <div>
      {/* <InputFile />
      <ItemsList />
      <ItemsUploaded /> */}
      {/* <ProgressBar></ProgressBar> */}
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
