import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PinsModel {

    @Field({ nullable: true, description: `pinsID` })
    pinsID?: string;

    @Field({ nullable: true, description: `Parent FileID is for work and building` })
    parentUploadedFileID?: string;

    @Field({ description: `FileID is for work and building` })
    uploadedFileID: string;

    @Field({ description: `X-Axis of pin` })
    x_axis: number;

    @Field({ description: `Y-Axis of pin` })
    y_axis: number;

    @Field({ description: `Z-Axis of pin` })
    z_axis: number;

    @Field({ nullable: true, description: `Page Number of PDF and 0 for images` })
    pageNumber: number;

    @Field({ nullable: true, description: `Pin Number` })
    pinNumber: number;

    @Field({ description: `Pins Deleted or not` })
    isDeleted?: boolean;

    @Field({ nullable: true, description: `Pins updated By` })
    updatedBy?: string;

    @Field({ nullable: true, description: `Pins created by` })
    createdBy?: string;

    @Field()
    createdAt?: Date;

    @Field()
    updatedAt?: Date;

    @Field({ nullable: true, description: `Pin Status` })
    status?: string;

    @Field({ nullable: true, description: `task ID` })
    taskID?: string;

    @Field({ nullable: true, description: `task Title` })
    taskTitle?: string;
}
