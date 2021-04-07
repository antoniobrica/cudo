import { string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateFolderInput {

    @Field({nullable: true})
    @Column()
    folderID: string;

    @Field({nullable: true})
    @Column()
    folderName: string;

    @Field(() => Boolean,{nullable: true})
    @Column()
    isFolder?: Boolean;

}