import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
class PinsFilterParams {

  @Field({ nullable: true, description: `File ID` })
  fileID?: string;

  @Field({ nullable: true, description: `File ID` })
  pinsID?: string;
}

export default PinsFilterParams;