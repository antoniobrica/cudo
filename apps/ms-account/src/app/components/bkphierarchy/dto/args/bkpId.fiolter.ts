import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BkpHierarchyFilterID {

  @Field({nullable: true, description: `BKP ID` })
  bkpID?: string;

}



