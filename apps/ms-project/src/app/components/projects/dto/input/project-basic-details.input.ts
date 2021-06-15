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

    @Field({ description: `Address Line 1`, nullable: true })
    addressLineOne?: string;

    @Field({ description: `Address Line 2` , nullable: true })
    addressLineTwo?: string;

    @Field({ description: `city`,  nullable: true })
    city?: string;

    @Field({ description: `state` , nullable: true  })
    state?: string;

    @Field({ description: `zip code for the city`, nullable: true  })
    zip?: string;

    @Field({ description: `country`, nullable: true  })
    country?: string;

}
