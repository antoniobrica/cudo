import { NotFoundException } from '@nestjs/common';

class ProjectNotFoundException extends NotFoundException {
  constructor(projectID: string) {
    super(`id ${projectID} not found`);
  }
}

export default ProjectNotFoundException;