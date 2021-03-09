import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class BkpModel {

  @Field()
  fileID: string;

  @Field()
  fileTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



