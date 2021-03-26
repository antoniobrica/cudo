import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {

  @Field({description:'File ID'})
  fileID: string;

  @Field({description:'type of file'})
  fileTitle: string;

}

