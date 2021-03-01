import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BkpModel {

  @Field()
  bkpID: string;

  @Field()
  bkpTitle: string;

  @Field()
  companyId: number;

  @Field()
  clientId: number;

}



