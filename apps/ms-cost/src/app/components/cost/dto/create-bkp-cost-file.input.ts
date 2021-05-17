import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBkpCostFileInput {

  @Field({ description: `File URL` })
  fileURL: string;

  @Field({ description: `File Title` })
  fileTitle: string;

  @Field({ description: `File type` })
  fileType: string;

  @Field({ description: `File version` })
  fileVersion: string;
}



