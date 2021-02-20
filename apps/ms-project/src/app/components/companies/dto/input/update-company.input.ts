import { Field, InputType } from '@nestjs/graphql';
import { CompanyTypeEnum } from '../../../../enums/company-type.enum';

@InputType()
export class UpdateCompanyInput {
  @Field()
  companyName: string;

  @Field(type => CompanyTypeEnum)
  companyType: CompanyTypeEnum;
}
