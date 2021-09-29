import { Field, InputType } from '@nestjs/graphql';
import { CreateBkpCostFileInput } from '../create-bkp-cost-file.input';

@InputType()
export class CreateBKPLayerTwo {

  @Field({ description: `Layer Two BKP ID` })
  BKPID: string;

  @Field({ description: `Layer Two BKP Title` })
  BKPTitle: string;

  @Field({ description: `Layer Two BKP description` })
  description: string;

  @Field({ description: `Layer Two BKP itemQuantity` })
  itemQuantity: number;

  @Field({ description: `Layer Two BKP itemPrice` })
  itemPrice: number;

  @Field({ description: `Layer Two BKP itemTotalPrice` })
  itemTotalPrice: number;

  @Field(() => [CreateBkpCostFileInput], { description: `BKP files` })
  files: [CreateBkpCostFileInput];

}



