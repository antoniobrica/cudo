import React, { useContext, useRef, Suspense, lazy } from 'react';
import './add-file.module.scss';
// import { AddFileUpload } from '@cudo/shared-components'
import { AddFileSettingUpload } from '@cudo/mf-document-lib';

import FileSetting from './file-setting'
import { SharedViewStateContext, UploadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';
import { tap } from 'rxjs/operators';
import { ContainerItem } from '@azure/storage-blob';
import { useTokenQuery } from '../../services/useRequest';
import { GET_TOKEN } from '../../graphql/graphql';

export interface AddFileProps { 
  //
}

export function AddFile(props: AddFileProps) {
 
  return (
    <div>
     
        <div style={{ marginLeft: 900 }} >
          <Suspense fallback={<div>Loading...</div>}>            
            <AddFileSettingUpload />
          </Suspense>
        </div>

    </div>
  );
}

export default AddFile;
