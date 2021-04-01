import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileVersionInput {

  @Field({description:'File ID'})
  fileID: string;

  @Field({description:'version of file'})
  fileVersion: string;

}

