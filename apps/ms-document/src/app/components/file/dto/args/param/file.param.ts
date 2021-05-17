import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FileParams {
  @Field({ description: `File URL` })
  fileURL?: string;

  @Field({ description: `File title` })
  fileTitle?: string;

  @Field({ description: `File Type` })
  fileType?: string;

  @Field({ description: `File Version` })
  fileVersion?: string;

}
