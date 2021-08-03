import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ProtocolFilesParam {
  @Field({nullable:true, description: `This is for file ID` })
  fileId?: string;

  @Field({nullable:true, description: `This is for protocol File ID` })
  protocolFileId?: string;

  @Field({nullable:true, description: `This is for protocol File Title` })
  protocolFileTitle?: string;
}

export default ProtocolFilesParam;