import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CompanyEntity } from '../../../entities/company.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CompanyFilterArgs } from '../dto/args/company-filter.args';
import { GetCompanyFilterArgs } from '../dto/args/get-company-filter.args';
import { CreateCompanyInput } from '../dto/input/create-company.input';
import { UpdateCompanyInput } from '../dto/input/update-company.input';
import CompanyNotFoundException from '../../companies/exceptions/companyNotFound.exception';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private CompanyRepository: Repository<CompanyEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createCompany(createCompanyInput: CreateCompanyInput, referenceFilter: ReferenceFilterParams): Promise<CompanyEntity> {
    try {
      const taskeDetails = new CompanyEntity({ ...createCompanyInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newCompany = await this.CompanyRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id }
      });
      await this.CompanyRepository.save(newCompany);
      return newCompany;
    } catch (error) {
      return error;
    }
  }

  public async updateCompany(updateCompanyInput: UpdateCompanyInput, companyFilterArgs: CompanyFilterArgs, referenceFilter: ReferenceFilterParams): Promise<CompanyEntity> {
    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);

    const company = await this.CompanyRepository.findOne({
      where: {
        companyType: companyFilterArgs.companyType,
        companyID: companyFilterArgs.companyID, reference: { id: selectedReference.id }
      }
    });
    if (company) {
      await this.CompanyRepository.update({
        id: company.id,
      }, {
        companyName: updateCompanyInput.companyName,
        companyType: updateCompanyInput.companyType
      });
      const updatedPost = await this.CompanyRepository.findOne(company.id);
      return updatedPost;
    }
    throw new CompanyNotFoundException(company.companyID);
  }

  public async findCompany(getCompanyFilterArgs: GetCompanyFilterArgs, refFilter: ReferenceFilterParams): Promise<CompanyEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.CompanyRepository.find({
      companyType: getCompanyFilterArgs.companyType,
      "reference": {
        id: selectedReference.id
      }
    });

  }

}