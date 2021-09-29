import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
class PinsFilterParams {

  @Field({ nullable: true, description: `Parent File ID` })
  parentUploadedFileID?: string;
  
  @Field({ nullable: true, description: `File ID` })
  uploadedFileID?: string;

  @Field({ nullable: true, description: `Pin ID` })
  pinsID?: string;

  @Field({ nullable: true, description: `Pin status` })
  status?: string;

  @Field({ nullable: true, description: `Page Number of PDF and 0 for images` })
  pageNumber: number;

}

export default PinsFilterParams;