import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateBKPLayerTwo } from './args/bkp.childrenLayerTwo';

@InputType()
export class UpdateBKPLayerTwo extends PartialType(CreateBKPLayerTwo) {

  @Field({ description: `Layer Two bkp cost ID` })
  bkpCostID: string;

}