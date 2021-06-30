import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBKPchildren {

  @Field({ description: `BKP ID` })
  bkpID: string;

  @Field({ description: `BKP Title` })
  bkpTitle: string;

  @Field(type => [CreateBKPchildren], {nullable:true, description: `BKP Children` })
  BKPChildren?: CreateBKPchildren[];

}



