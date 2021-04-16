import { NotFoundException } from '@nestjs/common';

class MileStoneNotFoundException extends NotFoundException {
  constructor(milestoneID: string) {
    super(`MileStone with id ${milestoneID} not found`);
  }
}

export default MileStoneNotFoundException;