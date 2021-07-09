import { Field, InputType } from "@nestjs/graphql";
import { SortEnum } from "../../enums/meetingSort.enum";


@InputType()
class SortFilterParam {
    
    @Field(type => SortEnum, {nullable:true, description: `Sort Meeting` })
    sortBy?: SortEnum;
}

export default SortFilterParam;