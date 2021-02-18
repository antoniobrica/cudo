import { NotFoundException } from '@nestjs/common';

class ProjectNotFoundException extends NotFoundException {
  constructor(projectID: string) {
    super(`Project with id ${projectID} not found`);
  }
}

export default ProjectNotFoundException;