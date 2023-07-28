import { Field, InputType } from '@nestjs/graphql';
import { CreateBKPchildren } from './args/bkp.children.param';

@InputType()
export class CreateBkpHierarchyInput {

  @Field()
  structureID?: string;

  @Field()
  structureName?: string;

  @Field()
  BKPID?: string;

  @Field()
  BKPTitle?: string;

  @Field(type => [CreateBKPchildren], {nullable:true, description: `BKP Children` })
  children?: CreateBKPchildren[];
  
}



