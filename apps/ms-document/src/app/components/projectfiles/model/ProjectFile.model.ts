import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProjectFileModel {

    @Field({ nullable: true, description: `Project ID given by user` })
    projectId?: string;

    @Field({ nullable: true, description: `uuid` })
    projectFileId: string;

    @Field({ nullable: true, description: `Phase ID given by user` })
    phaseId?: string;
    
    @Field({ nullable: true, description: `file type ID given by user` })
    filetypeId?: string;


    @Field({ nullable: true, description: `file structure ID given by user` })
    filestructureId?: string;


    @Field({ nullable: true, description: `folder name` })
    folderTitle?: string;


    @Field({ nullable: true, description: `BKP ID` })
    bkpId?: string;


    @Field({ nullable: true, description: `folder name exist or not` })
    isFolderNameExist?: Boolean;

    @Field({ nullable: true, description: `everyone allowerd to access` })
    isEveryOneAllowed?: Boolean;

    @Field({ description: `updated at` })
    updatedAt?: Date;

    @Field({ description: `created at` })
    createdAt?: Date;

    @Field({ nullable: true, description: `updated By` })
    updatedBy?: string;

    @Field({ nullable: true, description: `created by` })
    createdBy?: string;

}
