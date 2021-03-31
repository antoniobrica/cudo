import React, { useContext, useRef, Suspense, lazy } from 'react';
import './add-file.module.scss';
import { ModalAddPrint } from '@cudo/shared-components'
import FileSetting from './file-setting'
import { SharedViewStateContext, UploadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';
import { tap } from 'rxjs/operators';
import { ContainerItem } from '@azure/storage-blob';
import { useTokenQuery } from '../../services/useRequest';
import { GET_TOKEN } from '../../graphql/graphql';

export interface AddFileProps { }

export function AddFile(props: AddFileProps) {
  const [fileSelected, setFileSelected] = React.useState(null);
  const [items, setItems] = React.useState<ContainerItem[]>([]);
  // const { loading, error, data } = useTokenQuery(GET_TOKEN);
  // if(data){
  //   console.log('access token=>', data)
  // }
  const [open, setOpen] = React.useState(false)

  const context1 = useContext(UploadsViewStateContext);
  const context2 = useContext(SharedViewStateContext);


  const getContainersEffect = () => {
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
