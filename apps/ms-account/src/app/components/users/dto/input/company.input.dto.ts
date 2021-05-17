import { Field, InputType } from '@nestjs/graphql';
import { ReferenceTypeEnum } from '../../../../enums/company-type.enum';

@InputType()
class CompanyParams {
  @Field(type => ReferenceTypeEnum, { description: `Refrence Type` })
  referenceType: ReferenceTypeEnum;

  @Field({ description: `Refrence ID` })
  referenceID: string;
}

export default CompanyParams;