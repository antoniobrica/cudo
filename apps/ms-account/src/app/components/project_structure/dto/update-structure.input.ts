import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateStructureInput } from './create-structure.input';

@InputType()
export class UpdateStructureInput {

  @Field({ nullable: true, description: 'Parent Structure ID' })
  parentStructureID?: string;

  @Field({ nullable: true, description: 'Child Structure Name' })
  childStructureName?: string;
}


