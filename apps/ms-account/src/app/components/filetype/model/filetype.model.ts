import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class FileTypeModel {

  @Field()
  fileTypeID: string;

  @Field()
  fileTypeTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



