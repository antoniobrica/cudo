import { Field, InputType } from "@nestjs/graphql";
import { StatusEnum } from "../../enums/status.enum";


@InputType()
class StatusFilterParam {
    
    @Field(type => StatusEnum, {nullable:true, description: `Meeting Status` })
    status?: StatusEnum;
}

export default StatusFilterParam;