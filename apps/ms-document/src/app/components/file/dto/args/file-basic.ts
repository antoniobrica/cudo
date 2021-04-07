import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class FileBasicDetailsInput {


    @Field({ nullable: true, description: `PhaseID linked with task` })
    fileTypeID?: string;

    @Field({ nullable: true, description: `PhaseID linked with task` })
    fileTypeName?: string;

    @Field({ description: `PhaseID linked with task` })
    isFolder?: boolean;

    @Field({nullable: true, description: `BKPID attached with task` })
    BKPID?: string;

    @Field({nullable: true, description: `BKPID attached with task` })
    folderName?: string;

    @Field({nullable: true, description: `PhaseID attached with task` })
    phasesID?: string;

    @Field({nullable: true, description: `Reference updated at` })
    updatedAt?: Date;

    @Field({nullable: true, description: `Reference created at` })
    createdAt?: Date;

    @Field({ nullable: true, description: `Reference updated By` })
    updatedBy?: string;

    @Field({ nullable: true, description: `Reference created by` })
    createdBy?: string;
}
