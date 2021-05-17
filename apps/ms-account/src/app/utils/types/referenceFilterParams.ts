import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ReferenceTypeEnum } from '../../enums/company-type.enum';

@InputType()
class ReferenceFilterParams {
  @Field(type => ReferenceTypeEnum, { description: `Refrence Type` })
  referenceType: ReferenceTypeEnum;

  @Field({ description: `Refrence ID` })
  referenceID: string;
}

export default ReferenceFilterParams;