import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
class ObjectWithIdStringDto {
  @Field({ description: `Proejct ID` })
  projectID?: string;

  @Field({ description: `Company ID` })
  companyID?: string;

  @Field({ description: `Refrence Type` })
  referenceType?: string;

  @Field({ description: `Refrence Type` })
  referenceID?: string;
}

export default ObjectWithIdStringDto;