import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBKPLayerTwo {

  @Field({ description: `Layer Two BKP ID` })
  bkpID: string;

  @Field({ description: `Layer Two BKP Title` })
  bkpTitle: string;

}



