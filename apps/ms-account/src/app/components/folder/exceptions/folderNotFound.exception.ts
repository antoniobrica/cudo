import { NotFoundException } from '@nestjs/common';

class FolderNotFoundException extends NotFoundException {
  constructor(folderID: string) {
    super(`folder with id ${folderID} not found`);
  }
}

export default FolderNotFoundException;