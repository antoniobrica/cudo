import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class FileModel {

  @Field()
  fileURL: string;

  @Field()
  fileTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



