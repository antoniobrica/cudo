import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
@InputType()
export class CreateProjectTaskInput {

    @Field({ description: `This is for title task title` })
    taskTitle?: string;

    @Field({ description: `This is for start date in UTC` })
    startDate?: Date;

    @Field({ description: `Client Name` })
    endDate?: Date;

    @Field({ description: `Client Name` })
    estimatedDays?: string;

    @Field({ description: `Client Name` })
    sendNotification?: string;

    @Field({ description: `Client Name` })
    saveTaskAsTemplate?: string;

    @Field({ description: `Client Name` })
    BKPID?: string;

    @Field({ description: `Client Name` })
    phasesID?: string;

    @Field({ description: `Client Name` })
    status?: string;
}
