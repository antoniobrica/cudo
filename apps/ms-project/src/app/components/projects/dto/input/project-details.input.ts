import { Field, InputType } from "@nestjs/graphql";
import ProjectWorkParams from "apps/ms-project/src/app/utils/types/proejctworkParams";
import WorkParams from "apps/ms-project/src/app/utils/types/workParam";
import { ProjectBasicDetailsInput } from "./project-basic-details.input";

@InputType()
export class ProjectDetailsInput {

    @Field(type => ProjectBasicDetailsInput)
    projectBasics?: ProjectBasicDetailsInput;

    @Field(type => [ProjectWorkParams], { description: `` })
    projectWorkEstimates?: ProjectWorkParams[];

}
