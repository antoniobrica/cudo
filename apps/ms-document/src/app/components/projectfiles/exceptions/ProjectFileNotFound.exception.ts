import { NotFoundException } from '@nestjs/common';

class ProjectFileNotFoundException extends NotFoundException {
  constructor(proejctFileId: string) {
    super(`ProjectFile with id ${proejctFileId} not found`);
  }
}

export default ProjectFileNotFoundException;