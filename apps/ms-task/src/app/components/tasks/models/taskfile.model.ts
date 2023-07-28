import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class TaskFileModel {

  @Field({ nullable: true, description: `taskFile UUID` })
  taskFileID?: string;

  @Field({ nullable: true, description: `fileID` })
  fileID?: string;

  @Field({ nullable: true, description: `File Name` })
  fileName?: string;

  @Field({ nullable: true, description: `File URL` })
  fileUrl?: string;

}



