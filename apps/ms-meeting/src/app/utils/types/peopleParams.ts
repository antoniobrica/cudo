import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PeopleParams {
  @Field({ description: `User ID` })
  adminID?: string;

  @Field({ description: `User Name` })
  adminName?: string;
}

export default PeopleParams;