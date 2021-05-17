import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class pageParams {

  @Field({ description: `Item Limit`, nullable:true })
  limit?: number;

  @Field({ description: `page Number`, nullable:true})
  page?: number;
  
}
