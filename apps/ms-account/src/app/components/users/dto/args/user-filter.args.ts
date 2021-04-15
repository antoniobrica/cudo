import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UserFilterArgs {

    @Field({ description: `User ID` })
    email?: string;
}
