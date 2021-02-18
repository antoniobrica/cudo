import { ArgsType, Field } from "@nestjs/graphql";
import ReferenceFilterParams from "../../../../utils/types/referenceFilterParams";

@ArgsType()
export class GetTasksArgs {
    @Field({ description: `This is for title task title` })
    referenceFilter?: ReferenceFilterParams;
}
