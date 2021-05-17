import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class FileStructureModel {

  @Field()
  fileStructureID: string;

  @Field()
  fileStructureTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



