import { NotFoundException } from '@nestjs/common';

class FileStructureNotFoundException extends NotFoundException {
  constructor(fileStructureID: string) {
    super(`File-Structure with id ${fileStructureID} not found`);
  }
}

export default FileStructureNotFoundException;