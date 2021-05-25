import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PinsModel {

    @Field({ nullable: true, description: `pinsID` })
    pinsID?: string;

    @Field({ description: `FileID is for work and building` })
    uploadedFileID: string;

    @Field({ description: `X-Axis of pin` })
    x_axis: number;

    @Field({ description: `Y-Axis of pin` })
    y_axis: number;

    @Field({ description: `Z-Axis of pin` })
    z_axis: number;

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
}
