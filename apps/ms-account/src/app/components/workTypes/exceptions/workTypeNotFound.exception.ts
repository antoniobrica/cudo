import { NotFoundException } from '@nestjs/common';

class WorkTypeNotFoundException extends NotFoundException {
  constructor(workTypeID: string) {
    super(`WorkType with id ${workTypeID} not found`);
  }
}

export default WorkTypeNotFoundException;