import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateBKPchildren } from './args/bkp.children.param';
import { CreateBKPLayerTwo } from './args/bkp.childrenLayerTwo';

@InputType()
export class AddLayerTwoBkpHierarchyInput extends PartialType(CreateBKPchildren) {
  @Field({ description: `This is structure ID` })
  structureID: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [CreateBKPLayerTwo], { nullable: true, description: `BKP Children` })
  childrenLayerTwo?: CreateBKPLayerTwo[];
}



