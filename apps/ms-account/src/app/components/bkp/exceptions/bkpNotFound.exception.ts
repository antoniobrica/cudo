import { NotFoundException } from '@nestjs/common';

class BkpNotFoundException extends NotFoundException {
  constructor(bkpID: string) {
    super(`BKP with id ${bkpID} not found`);
  }
}

export default BkpNotFoundException;