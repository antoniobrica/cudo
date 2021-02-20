import { NotFoundException } from '@nestjs/common';

class CompanyNotFoundException extends NotFoundException {
  constructor(companyID: string) {
    super(`Company with id ${companyID} not found`);
  }
}

export default CompanyNotFoundException;