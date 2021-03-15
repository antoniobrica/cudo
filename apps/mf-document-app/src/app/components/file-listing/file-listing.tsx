import React from 'react';

import './file-listing.module.scss';
import FileStructure from 'libs/shared-components/src/lib/components/filestructure/filestask';
/* eslint-disable-next-line */
export interface FileListingProps {}

export function FileListing(props: FileListingProps) {
  return (
    <div>
    <FileStructure></FileStructure>    
    </div>
  );
}

export default FileListing;
