import { NotFoundException } from '@nestjs/common';

class StructureNotFoundException extends NotFoundException {
  constructor(StructureID: string) {
    super(`Structure with id ${StructureID} not found`);
  }
}

export default StructureNotFoundException;