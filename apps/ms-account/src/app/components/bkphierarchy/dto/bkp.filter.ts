import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BKPFilterParam {

  @Field({nullable: true, description: `BKP ID` })
  bkpCostID?: string;


}



