import { NotFoundException } from '@nestjs/common';

class BuildingTypeNotFoundException extends NotFoundException {
  constructor(buildingTypeID: string) {
    super(`BuildingType with id ${buildingTypeID} not found`);
  }
}

export default BuildingTypeNotFoundException;