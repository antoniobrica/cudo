import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileTypeInput {

  @Field({description:'fileType ID'})
  fileTypeID: string;

  @Field({description:'fileType'})
  fileTypeTitle: string;

}

