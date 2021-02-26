import { Field, InputType } from '@nestjs/graphql';
import { CompanyTypeEnum } from '../../../../enums/company-type.enum';
import { type } from 'os';

@InputType()
export class CreateCompanyInput {
  @Field()
  companyName: string;

  @Field(type => CompanyTypeEnum)
  companyType: CompanyTypeEnum;
}

