import { Field, InputType } from '@nestjs/graphql';
import { CreateBkpCostFileInput } from './create-bkp-cost-file.input';

@InputType()
export class CreateBkpCostBasicInput {

  @Field({ description: `BKP ID` })
  BKPID: string;

  @Field({ description: `BKP Title` })
  BKPTitle: string;

  @Field({ description: `BKP Description` })
  description: string;

  @Field({ description: `BKP quantity` })
  itemQuantity: number;

  @Field({ description: `Each BKP item price` })
  itemPrice: number;
}



