import React from 'react';

import './add-file.module.scss';
import ModalAddPrint from 'libs/shared-components/src/lib/components/modal/addfile';
import uploadFileToBlob, { isStorageConfigured } from './azure-storage-blob';

/* eslint-disable-next-line */
export interface AddFileProps {}

export function AddFile(props: AddFileProps) {

  const [blobList, setBlobList] = React.useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = React.useState(null);

  // UI/form management
  const [uploading, setUploading] = React.useState(false);
  const [inputKey, setInputKey] = React.useState(Math.random().toString(36));

  const onFile = (data) => {
    console.log('uploaded file', data)
    // capture file into state
    setFileSelected(data);
  };

  const onFileUpload = async () => {
    console.log('onFileUpload',fileSelected)
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer: string[] = await uploadFileToBlob(fileSelected);

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };
  return (
    <div>
      <ModalAddPrint fileData={onFile} onFileSubmit={onFileUpload}></ModalAddPrint>
    </div>
  );
}

export default AddFile;
