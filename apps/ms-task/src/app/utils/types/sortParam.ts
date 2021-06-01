import { Field, InputType } from "@nestjs/graphql";
import { SortEnum } from "../../enums/taskSort.enum";


@InputType()
class SortFilterParam {
    
    @Field(type => SortEnum, {nullable:true, description: `Sort Task` })
    sortBy?: SortEnum;
}

export default SortFilterParam;