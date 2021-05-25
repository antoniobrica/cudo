import { NotFoundException } from '@nestjs/common';

class FileNotFoundException extends NotFoundException {
  constructor(uploadedFileID: string) {
    super(`File with id ${uploadedFileID} not found`);
  }
}

export default FileNotFoundException;