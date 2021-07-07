import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BkpHierarchyFilterTitle {

  @Field({ nullable: true, description: `BKP Title` })
  bkpTitle?: string;

}



