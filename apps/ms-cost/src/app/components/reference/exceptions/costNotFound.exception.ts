import { NotFoundException } from '@nestjs/common';

class ProjectNotFoundException extends NotFoundException {
  constructor(costID: string) {
    super(`Cost with id ${costID} not found`);
  }
}

export default ProjectNotFoundException;