import React from 'react';
import FileUpload from '../file-upload/file-upload'
import './file-upload-index.module.scss';

/* eslint-disable-next-line */
export interface FileUploadIndexProps {
  openSettingF
}

export function FileUploadIndex(props: FileUploadIndexProps) {
  return (
    <div>
      <FileUpload openSettingF={props.openSettingF} />
    </div>
  );
}

export default FileUploadIndex;
