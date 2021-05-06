import { Field, InputType } from '@nestjs/graphql';

@InputType()
class SessionFilterParam {

  @Field({ description: `session ID` })
  sessionID: string;
}

export default SessionFilterParam;