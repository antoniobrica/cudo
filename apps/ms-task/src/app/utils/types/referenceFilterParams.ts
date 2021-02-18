import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
class ReferenceFilterParams {
  @Field({ description: `Project ID` })
  projectID?: string;

  @Field({ description: `Company ID` })
  companyID?: string;

  @Field({ description: `Refrence Type` })
  referenceType?: string;

  @Field({ description: `Refrence ID` })
  referenceID?: string;
}

export default ReferenceFilterParams;