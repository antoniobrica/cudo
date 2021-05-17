import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class FileBasicDetailsInput {

    @Field({ nullable: true, description: `PhaseID linked with task` })
    fileTypeID?: string;

    @Field({ nullable: true, description: `PhaseID linked with task` })
    fileTypeName?: string;

    @Field({ description: `PhaseID linked with task` })
    isFolder?: boolean;

    @Field({ nullable: true,description: `PhaseID linked with task` })
    generateFileName?: boolean;

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

    @Field({ description: 'File Name' })
    isEveryOneAllowed?: boolean;

}
