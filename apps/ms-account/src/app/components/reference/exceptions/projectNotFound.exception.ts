import { NotFoundException } from '@nestjs/common';

class ReferenceNotFoundException extends NotFoundException {
  constructor(referenceID: string) {
    super(`Reference with id ${referenceID} not found`);
  }
}

export default ReferenceNotFoundException;