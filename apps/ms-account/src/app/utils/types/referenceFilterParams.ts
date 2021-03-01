import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ReferenceFilterParams {
  @Field({ description: `Refrence Type` })
  referenceType: string;

  @Field({ description: `Refrence ID` })
  referenceID: string;
}

export default ReferenceFilterParams;