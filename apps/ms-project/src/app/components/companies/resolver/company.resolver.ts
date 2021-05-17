import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CompanyEntity } from '../../../entities/company.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CompanyFilterArgs } from '../dto/args/company-filter.args';
import { GetCompanyFilterArgs } from '../dto/args/get-company-filter.args';
import { CreateCompanyInput } from '../dto/input/create-company.input';
import { UpdateCompanyInput } from '../dto/input/update-company.input';
import { CompanyModel } from '../model/company.model';
import { CompanyService } from '../service/company.service';

@Resolver(() => CompanyModel)
export class CompanyResolver {
  constructor(
    private readonly companyService: CompanyService) { }

  @Query(() => [CompanyModel], { nullable: true })
  async company(@Args() getCompanyFilterArgs: GetCompanyFilterArgs,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<CompanyEntity[]> {
    return await this.companyService.findCompany(getCompanyFilterArgs, referenceFilter)
  }

  @Mutation(() => CompanyModel)
  async createCompany(
    @Args('companyDetails') createCompanyInput: CreateCompanyInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.companyService.createCompany(createCompanyInput, referenceFilter);
  }

  @Mutation(() => CompanyModel)
  async updateCompany(
    @Args('companyUpdateDetails') updateCompanyInput: UpdateCompanyInput,
    @Args() companyFilterArgs: CompanyFilterArgs,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.companyService.updateCompany(updateCompanyInput, companyFilterArgs, referenceFilter);
  }

}
