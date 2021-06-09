import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStructureInput {

  @Field({ description: 'Structure name for all level' })
  parentStructureName: string;

  @Field({ nullable: true, description: 'Structure name for all level' })
  childStructureName?: string;

}

