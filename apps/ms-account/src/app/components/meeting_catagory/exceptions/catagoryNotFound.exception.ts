import { NotFoundException } from '@nestjs/common';

class CatagoryNotFoundException extends NotFoundException {
  constructor(meetingCatagoryID: string) {
    super(`catagory with id ${meetingCatagoryID} not found`);
  }
}

export default CatagoryNotFoundException;