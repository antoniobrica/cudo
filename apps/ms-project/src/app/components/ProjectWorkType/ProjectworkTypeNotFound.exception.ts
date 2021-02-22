import { NotFoundException } from '@nestjs/common';

class ProjectWorkTypeNotFoundException extends NotFoundException {
  constructor(workTypeID: string) {
    super(`WorkType with id ${workTypeID} not found`);
  }
}

export default ProjectWorkTypeNotFoundException;