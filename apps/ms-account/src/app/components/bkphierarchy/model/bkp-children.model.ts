import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BKPChildrenModel {

  @Field({ description: `BKP ID` })
  bkpID: string;

  @Field({ description: `BKP Title` })
  bkpTitle: string;

  @Field({ nullable: true, description: `if BKP-Cost is Deleted` })
  isDeleted?: Boolean;

  @Field(type => [BKPChildrenModel], { nullable: true, description: `BKP Children ` })
  children: BKPChildrenModel[];

}



