import { NotFoundException } from '@nestjs/common';

class PhaseNotFoundException extends NotFoundException {
  constructor(phaseID: string) {
    super(`Phase with id ${phaseID} not found`);
  }
}

export default PhaseNotFoundException;