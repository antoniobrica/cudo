import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PeopleParams {
  @Field({ description: `User ID` })
  userID?: string;

  @Field({ description: `User Name` })
  userName?: string;

  @Field({ description: `User image`, nullable:true })
  imageUrl?: string;
}

export default PeopleParams;