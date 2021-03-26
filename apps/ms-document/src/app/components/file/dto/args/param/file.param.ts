import { Field, InputType } from '@nestjs/graphql';

@InputType()
class FileParams {
  @Field({ description: `User ID` })
  fileURL?: string;

  @Field({ description: `User Name` })
  fileTitle?: string;
}

export default FileParams;