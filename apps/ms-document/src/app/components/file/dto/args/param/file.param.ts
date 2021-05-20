import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FileParams {

  @Field({ nullable: true, description: `Mejor file Version ID` })
  majorFileID?: string;

  @Field({ nullable: true, description: `File URL` })
  fileURL?: string;

  @Field({ nullable: true, description: `File title` })
  fileTitle?: string;

  @Field({ nullable: true, description: `File Type` })
  fileType?: string;

  @Field({ nullable: true, description: `File Version` })
  fileVersion?: string;

}
