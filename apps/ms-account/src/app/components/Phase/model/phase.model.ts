import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class phaseModel {

  @Field()
  id: number;

  @Field()
  phaseID: string;

  @Field()
  phaseTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



