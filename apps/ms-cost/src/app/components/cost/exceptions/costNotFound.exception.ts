import { NotFoundException } from '@nestjs/common';

class CostNotFoundException extends NotFoundException {
  constructor(costID: string) {
    super(`Cost with id ${costID} not found`);
  }
}

export default CostNotFoundException;