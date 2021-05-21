import React from 'react';

import './file-list.module.scss';

/* eslint-disable-next-line */
export interface FileListProps {
  open,
  cancel,
  folderData
}

export function FileList(props: FileListProps) {
  return (
    <div>
      <h1>Welcome to file-list!</h1>
    </div>
  );
}

export default FileList;
