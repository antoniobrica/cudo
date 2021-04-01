import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class FileBasicDetailsInput {


    @Field({ nullable: true, description: `PhaseID linked with task` })
    FileTypeID?: string;

    @Field({ description: `BKPID attached with task` })
    BKPID?: string;

    @Field({ description: `PhaseID attached with task` })
    phasesID?: string;

}
