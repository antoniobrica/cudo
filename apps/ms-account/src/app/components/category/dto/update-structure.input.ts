import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateStructureInput } from './create-Structure.input';

@InputType()
export class UpdateStructureInput {

  @Field()
  parentStructureID?: number;

  @Field()
  childStructureName?: string;
}


