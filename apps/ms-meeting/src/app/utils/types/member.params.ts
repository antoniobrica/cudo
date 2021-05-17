import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MemberParams {
  @Field({ description: `User ID` })
  memberID?: string;

  @Field({ description: `User Name` })
  memberName?: string;

  @Field({ description: `User Name` })
  image?: string;
}

export default MemberParams;