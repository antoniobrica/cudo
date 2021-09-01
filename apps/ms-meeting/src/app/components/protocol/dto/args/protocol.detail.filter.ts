import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ProtocolDetailFilterParam {

  @Field({ description: `protocol Id` })
  protocolId: string;
}

export default ProtocolDetailFilterParam;