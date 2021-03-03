import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProjectBasicDetailsInput {

    @Field({ description: `This is for Project Name` })
    projectName?: string;

    @Field({ description: `Proejct Number` })
    projectNum: number

    @Field({ description: `Client Name` })
    client: string;

    @Field({ description: `Building Type` })
    buildingType?: string;

    @Field({ description: `printing Company` })
    printingCom?: string;

    @Field({ description: `Tell more about the project` })
    description?: string;

}
