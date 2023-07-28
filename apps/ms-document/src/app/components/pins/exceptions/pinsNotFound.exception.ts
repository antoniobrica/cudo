import { NotFoundException } from '@nestjs/common';

class PinsNotFoundException extends NotFoundException {
  constructor(pinsID: string) {
    super(`id ${pinsID} not found`);
  }
}

export default PinsNotFoundException;