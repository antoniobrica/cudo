import { NotFoundException } from '@nestjs/common';

class SubTaskNotFoundException extends NotFoundException {
  constructor(subtaskID: string) {
    super(`MileStone with id ${subtaskID} not found`);
  }
}

export default SubTaskNotFoundException;