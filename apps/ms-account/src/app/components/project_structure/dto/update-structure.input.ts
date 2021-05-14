import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateStructureInput } from './create-structure.input';

@InputType()
export class UpdateStructureInput {

  @Field()
  parentStructureID?: number;

  @Field()
  childStructureName?: string;
}


