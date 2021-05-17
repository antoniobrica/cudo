import { NotFoundException } from '@nestjs/common';

class FileStructureNotFoundException extends NotFoundException {
  constructor(fileStructureID: string) {
    super(`File-structure with id ${fileStructureID} not found`);
  }
}

export default FileStructureNotFoundException;