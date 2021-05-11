import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PeopleParams {
  @Field({ description: `User ID` })
  adminID?: string;

  @Field({ description: `User Name` })
  adminName?: string;

  @Field({ description: `User Image` })
  image?: string;
}

export default PeopleParams;