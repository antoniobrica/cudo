import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";
import { StatusEnum } from "../../../../enum/status.enum";

@InputType()
export class PinsInputDto {

    @Field({ description: `FileID is for work and building` })
    uploadedFileID: string;

    @Field({ description: `X-Axis of pin` })
    x_axis: number;

    @Field({ description: `Y-Axis of pin` })
    y_axis: number;

    @Field({ description: `Z-Axis of pin` })
    z_axis: number;

    @Field({ description: `Page Number of PDF and 0 for images` })
    pageNumber: number;

    @Field({ description: `Pin Number` })
    pinNumber: number;

    @Field({ description: `Pins Deleted or not` })
    isDeleted?: boolean;

    @Field(type => StatusEnum, { nullable: true, description: `Pin status` })
    status?: StatusEnum;
}
