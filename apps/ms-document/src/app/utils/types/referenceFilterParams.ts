import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ReferenceTypeEnum } from '../../enum/reference-type.enum';

@InputType()
class ReferenceFilterParams {
  @Field(type => ReferenceTypeEnum, { description: `Refrence Type` })
  referenceType?: ReferenceTypeEnum;

  @Field({ description: `Refrence ID` })
  referenceID?: string;

  @Field({ nullable: true, description: `Refrence ID` })
  referenceTitle?: string;
}

export default ReferenceFilterParams;