import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStructureInput {

  @Field()
  parentStructureID?: number;

  @Field()
  childStructureName?: string;
}


