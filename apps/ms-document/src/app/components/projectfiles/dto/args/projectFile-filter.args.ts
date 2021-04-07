import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class ProjectFileFilterArgs {

    @Field({ description: `projectfile ID` })
    projectFileId?: string;
}
