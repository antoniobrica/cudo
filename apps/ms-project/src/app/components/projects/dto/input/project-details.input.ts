import { Field, InputType } from "@nestjs/graphql";
import ProjectWorkParams from "../../../../utils/types/proejctworkParams";
import { ProjectBasicDetailsInput } from "./project-basic-details.input";

@InputType()
export class ProjectDetailsInput {

    @Field(type => ProjectBasicDetailsInput)
    projectBasics?: ProjectBasicDetailsInput;

    @Field(type => [ProjectWorkParams], {nullable: true, description: `` })
    projectWorkEstimates?: ProjectWorkParams[];

}
