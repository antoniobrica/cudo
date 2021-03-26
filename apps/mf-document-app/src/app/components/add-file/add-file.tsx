import React, { useContext, useRef, Suspense, lazy } from 'react';
import './add-file.module.scss';
// import ModalAddPrint from 'libs/shared-components/src/lib/components/modal/addfile';
import { ModalAddPrint } from '@cudo/shared-components'
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
import { useTokenQuery } from '../../services/useRequest';
import { GET_TOKEN } from '../../graphql/graphql';
// const ModalAddPrint = React.lazy(() => import('libs/shared-components/src/lib/components/modal/addfile'));

export interface AddFileProps { }

export function AddFile(props: AddFileProps) {
  const [fileSelected, setFileSelected] = React.useState(null);
  const [items, setItems] = React.useState<ContainerItem[]>([]);
  const { loading, error, data } = useTokenQuery(GET_TOKEN);
  if(data){
    console.log('access token=>', data)
  }
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
           <Suspense fallback={<div>Loading...</div>}>
          <ModalAddPrint fileData={onFile} onFileSubmit={onFileUpload} setting={openSetting}></ModalAddPrint>
          </Suspense>
        </div>

      }
    </div>
  );
}

export default AddFile;
