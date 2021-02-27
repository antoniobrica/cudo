import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PeopleParams {
  @Field({ description: `User ID` })
  userID?: string;

  @Field({ description: `User Name` })
  userName?: string;
}

export default PeopleParams;