import { Field, InputType } from "@nestjs/graphql";
import { TaskTypeEnum } from "apps/ms-task/src/app/enums/taskType.enum";
import { StatusEnum } from "../../../../enums/status.enum";

@InputType()
export class TaskBasicDetailsInput {

    @Field({ description: `This is for title task title` })
    taskTitle?: string;

    @Field({ description: `This is for task start date in UTC` })
    startDate?: Date;

    @Field({ description: `This is for task end date in UTC` })
    endDate?: Date;

    @Field({ description: `This is for task estimated days` })
    estimatedDays?: string;

    @Field({ description: `To send notificatioin on task created` })
    sendNotification?: boolean;

    @Field({ description: `To save task as template as well` })
    saveTaskAsTemplate?: string;

    @Field({ description: `BKPID attached with task` })
    BKPID?: string;

    @Field({ description: `PhaseID attached with task` })
    phaseID?: string;

    @Field({ description: `BKP Title attached with task` })
    BKPTitle?: string;

    @Field({ description: `Phase Name attached with task` })
    phaseName?: string;

    @Field(type => StatusEnum, { description: `Task status` })
    status?: StatusEnum;

    @Field({ nullable: true, description: ` Task ParentID`  })
    fileID?: string;

    @Field({ nullable: true, description: ` Task ParentID`  })
    fileName?: string;

    @Field({ nullable: true, description: ` Task ParentID`  })
    taskTypeID?: string;

    @Field(type => TaskTypeEnum, { description: `Task status` })
    taskType?: TaskTypeEnum;

    @Field({ description: `Description of task` })
    description?: string;

}
