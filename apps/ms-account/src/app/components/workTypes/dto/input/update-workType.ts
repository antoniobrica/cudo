import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkType {
  @Field()
  workTypeID?: string;
}


