import React from 'react';
import { GET_FILES } from '../../graphql/graphql';
import { useFileQuery } from '../../services/useRequest';
import { LoaderPage } from "@cudo/shared-components";
import SelectFilePopup from 'libs/shared-components/src/lib/components/modal/selectfile';

import './file-list.module.scss';

/* eslint-disable-next-line */
export interface FileListProps {

}

export function FileList(props: FileListProps) {
  const { loading, error, data } = useFileQuery(GET_FILES);
  if (data) {
    console.log('files', data);

  }

  return (
    <div>
      {loading ?
        <LoaderPage /> : null}
      <SelectFilePopup files={data?.File} />
    </div>
  );
}

export default FileList;
