import React from 'react';

import './add-file.module.scss';
import ModalAddPrint from 'libs/shared-components/src/lib/components/modal/addfile';

/* eslint-disable-next-line */
export interface AddFileProps {}

export function AddFile(props: AddFileProps) {
  return (
    <div>
      <h1>Welcome to add-file!</h1>
      <ModalAddPrint></ModalAddPrint>
    </div>
  );
}

export default AddFile;
