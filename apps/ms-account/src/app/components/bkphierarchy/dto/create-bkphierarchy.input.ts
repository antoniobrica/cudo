import { Field, InputType } from '@nestjs/graphql';
import { CreateBKPchildren } from './args/bkp.children.param';

@InputType()
export class CreateBkpHierarchyInput {

  @Field()
  bkpID?: string;

  @Field()
  bkpTitle?: string;

  @Field(type => [CreateBKPchildren], {nullable:true, description: `BKP Children` })
  children?: CreateBKPchildren[];
  
}



