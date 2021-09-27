import { Field, InputType } from "@nestjs/graphql";

@InputType()
class BkpTitleFilterParams {
    @Field({ description: "BKP title" })
    bkpTitle: string

    @Field({ nullable: true, description: "BKP bkpId" })
    bkpId?: string
}
export default BkpTitleFilterParams