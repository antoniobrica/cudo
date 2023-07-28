import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StructureModel {

  @Field({ nullable: true, description: `Structure ID` })
  structureID: string;

  @Field({ nullable: true, description: `Structure referenced with ID` })
  referenceID: string;

  @Field({ nullable: true, description: `Structure refeerence with type` })
  referenceType: string;

  @Field({ nullable: true, description: `Structure Name` })
  structureName: string;

  @Field(type => [StructureModel], { nullable: true, description: `Child Structure` })
  children: StructureModel[];


}



