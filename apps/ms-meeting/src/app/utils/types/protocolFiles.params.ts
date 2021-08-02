import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ProtocolFilesParam {
  @Field({ description: `This is for file ID` })
  fileId?: string;

  @Field({ description: `This is for protocol File ID` })
  protocolFileId?: string;

  @Field({ description: `This is for protocol File Title` })
  protocolFileTitle?: string;
}

export default ProtocolFilesParam;