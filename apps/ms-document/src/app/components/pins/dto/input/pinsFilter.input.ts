import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
class PinsFilterParams {

  @Field({ nullable: true, description: `File ID` })
  uploadedFileID?: string;

  @Field({ nullable: true, description: `File ID` })
  pinsID?: string;

  @Field({ nullable: true, description: `Page Number of PDF and 0 for images` })
  pageNumber: number;

}

export default PinsFilterParams;