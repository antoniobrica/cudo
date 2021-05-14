import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StructureModel {

  @Field({ nullable: true, description: `User ID` })
  id: number;

  @Field({ nullable: true, description: `User ID` })
  referenceID: string;

  @Field({ nullable: true, description: `User ID` })
  referenceType: string;

  @Field({ nullable: true, description: `User ID` })
  structureName: string;

  @Field(type => [StructureModel], { nullable: true, description: `User ID` })
  children: StructureModel[];


}



