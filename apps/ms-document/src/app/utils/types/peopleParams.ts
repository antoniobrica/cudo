import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PeopleParams {
  @Field({ description: `User ID` })
  userID?: string;

  @Field({ description: `User Name` })
  userName?: string;

  @Field({nullable: true, description: `User image` })
  imageUrl?: string;
  
}

export default PeopleParams;