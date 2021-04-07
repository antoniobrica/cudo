import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FileParams {
  @Field({ description: `User ID` })
  fileURL?: string;

  @Field({ description: `User Name` })
  fileTitle?: string;
  
}
