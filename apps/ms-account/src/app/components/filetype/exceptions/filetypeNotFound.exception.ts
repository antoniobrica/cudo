import { NotFoundException } from '@nestjs/common';

class FileTypeNotFoundException extends NotFoundException {
  constructor(fileTypeID: string) {
    super(`filetype with id ${fileTypeID} not found`);
  }
}

export default FileTypeNotFoundException;