import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CostBasicDetailsInput {

    @Field({ nullable: true, description: `PhaseID linked with task` })
    costTypeID?: string;

    @Field({ nullable: true, description: `PhaseID linked with task` })
    costTypeName?: string;

    @Field({ description: `PhaseID linked with task` })
    isFolder?: boolean;

    @Field({ nullable: true, description: `BKPID attached with task` })
    BKPID?: string;

    @Field({ nullable: true, description: `BKPID attached with task` })
    BKPIDTitle?: string;

    @Field({ nullable: true, description: `BKPID attached with task` })
    folderName?: string;

    @Field({ nullable: true, description: `PhaseID attached with task` })
    phaseID?: string;

    @Field({ nullable: true, description: `PhaseID attached with task` })
    phaseName?: string;

    @Field({ nullable: true, description: `PhaseID attached with task` })
    structureID?: string;

    @Field({ nullable: true, description: `PhaseID attached with task` })
    structureTitle?: string;

    @Field({ description: 'Cost Name' })
    isEveryOneAllowed?: boolean;

}
