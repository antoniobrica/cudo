import { NotFoundException } from '@nestjs/common';

class CostNotFoundException extends NotFoundException {
  constructor(projectID: string) {
    super(`Project with id ${projectID} not found`);
  }
}

export default CostNotFoundException;