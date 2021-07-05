import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBkpCostFileInput {

  @Field({ description: `File URL` })
  uploadedFileID: string;

  @Field({ description: `File Title` })
  uploadedFileTitle: string;
}



