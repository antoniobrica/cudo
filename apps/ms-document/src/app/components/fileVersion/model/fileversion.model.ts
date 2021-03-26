import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileVersionModel {

  @Field()
  fileID: string;

  @Field()
  fileVersion: string;

}



