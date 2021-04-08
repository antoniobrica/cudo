import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class FolderModel {

  @Field()
  folderID: string;

  @Field()
  folderTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



