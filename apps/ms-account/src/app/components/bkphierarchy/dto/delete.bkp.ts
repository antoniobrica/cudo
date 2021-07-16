import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class BkpDeleteInput {

    @Field({ description: `This is for bkpUID` })
    bkpUID: string;
}
