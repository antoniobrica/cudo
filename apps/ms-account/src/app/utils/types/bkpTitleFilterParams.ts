import { Field, InputType } from "@nestjs/graphql";

@InputType()
class BkpTitleFilterParams {
    @Field({description: "BKP title"})
    bkpTitle: string
}
export default BkpTitleFilterParams