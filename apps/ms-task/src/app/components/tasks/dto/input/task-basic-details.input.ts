import { Field, InputType } from "@nestjs/graphql";
import { TaskAssigneesInput } from "./task-assignees.input";
import { TaskFollowersInput } from "./task-followers.input";
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
    sendNotification?: string;

    @Field({ description: `To save task as template as well` })
    saveTaskAsTemplate?: string;

    @Field({ description: `BKPID attached with task` })
    BKPID?: string;

    @Field({ description: `PhaseID attached with task` })
    phasesID?: string;

    @Field({ description: `Status of task` })
    status?: string;

}
