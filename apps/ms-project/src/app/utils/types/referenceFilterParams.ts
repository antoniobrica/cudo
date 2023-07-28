import { Field, InputType } from '@nestjs/graphql';
import { ReferenceTypeEnum } from '../../enums/reference-type.enum';

@InputType()
class ReferenceFilterParams {

  @Field(type => ReferenceTypeEnum,{ description: `Refrence Type` })
  referenceType?: ReferenceTypeEnum;

  @Field({ description: `Refrence ID` })
  referenceID?: string;
}

export default ReferenceFilterParams;