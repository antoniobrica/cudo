import { NotFoundException } from '@nestjs/common';

class FileNotFoundException extends NotFoundException {
  constructor(fileID: string) {
    super(`File with id ${fileID} not found`);
  }
}

export default FileNotFoundException;