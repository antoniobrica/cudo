import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
@InputType()
export class CreateProjectTaskInput {
    @Field({ description: `Client Name` })
    @IsOptional()
    ParentTaskID?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    ChildTaskID?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    TaskTitle?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    StartDate?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    EndDate?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    EstimatedDays?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    SendNotification?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    SaveTaskAsTemplate?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    BKPID?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    PhasesID?: string;

    @Field({ description: `Client Name` })
    CreatedOn?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    CreatedBy?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    UpdatedOn?: number;

    @Field({ description: `Client Name` })
    @IsOptional()
    UpdatedBy?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    IsDeleted?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    ReferenceID?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    ReferenceTypeID?: string;

    @Field({ description: `Client Name` })
    @IsOptional()
    Status?: string;
}
