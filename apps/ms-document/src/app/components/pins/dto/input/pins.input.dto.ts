import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";

@InputType()
export class PinsInputDto {

    @Field({ description: `FileID is for work and building` })
    fileID: string;

    @Field({ description: `X-Axis of pin` })
    x_axis: number;

    @Field({ description: `Y-Axis of pin` })
    y_axis: number;

    @Field({ description: `Z-Axis of pin` })
    z_axis: number;

    @Field({ description: `Pins Deleted or not` })
    isDeleted?: boolean;

}
