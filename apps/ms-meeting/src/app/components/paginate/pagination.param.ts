import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class pageParams {

  @Field({ description: `Item Limit` })
  limit: number;

  @Field({ description: `page Number` })
  page: number;
  
}
