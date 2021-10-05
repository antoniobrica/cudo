import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class FileBasicDetailsInput {

    @Field({ nullable: true, description: `fileTypeID linked with file` })
    fileTypeID?: string;

    @Field({ nullable: true, description: `fileTypeName linked with file` })
    fileTypeName?: string;

    @Field({ description: `isFolder linked with file` })
    isFolder?: boolean;

    @Field({ nullable: true,description: `generateFileName linked with file` })
    generateFileName?: boolean;

    @Field({ nullable: true, description: `BKPID attached with file` })
    BKPID?: string;

    @Field({ nullable: true, description: `BKPIDTitle attached with file` })
    BKPIDTitle?: string;

    @Field({ nullable: true, description: `folderName attached with file` })
    folderName?: string;

    @Field({ nullable: true, description: `PhaseID attached with file` })
    phaseID?: string;

    @Field({ nullable: true, description: `phaseName attached with file` })
    phaseName?: string;

    @Field({ nullable: true, description: `structureID attached with file` })
    structureID?: string;

    @Field({ nullable: true, description: `structureTitle attached with file` })
    structureTitle?: string;

    @Field({ description: 'isEveryOneAllowed attached with file' })
    isEveryOneAllowed?: boolean;

    @Field({ nullable: true, description: `workTypeID attached with file` })
    workTypeID?: string;

    @Field({ nullable: true, description: `workTypeTitle attached with file` })
    workTypeTitle?: string;

}
