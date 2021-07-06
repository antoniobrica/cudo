import { Field, InputType } from '@nestjs/graphql';
import { CreateBKPLayerTwo } from './bkp.childrenLayerTwo';

@InputType()
export class CreateBKPchildren {

  @Field({ description: `Layer One BKP ID` })
  bkpID: string;

  @Field({ description: `Layer One BKP Title` })
  bkpTitle: string;

  @Field(type => [CreateBKPLayerTwo], {nullable:true, description: `BKP Children` })
  childrenLayerTwo?: CreateBKPLayerTwo[];

}



