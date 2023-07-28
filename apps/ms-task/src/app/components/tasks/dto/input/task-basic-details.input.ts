import { Field, InputType } from "@nestjs/graphql";
import { ProjectWorkTypeEnum } from "apps/ms-task/src/app/enums/projectwork-type.enum";
import { TaskTypeEnum } from "apps/ms-task/src/app/enums/taskType.enum";
import { StatusEnum } from "../../../../enums/status.enum";

@InputType()
export class TaskBasicDetailsInput {

    @Field({ description: `This is for title task title` })
    taskTitle?: string;

    @Field({ nullable:true, description: `This is for task start date in UTC` })
    startDate?: Date;

    @Field({ nullable:true, description: `This is for task end date in UTC` })
    endDate?: Date;

    @Field({ nullable:true, description: `This is for task estimated days` })
    estimatedDays?: string;

    @Field({ nullable:true, description: `To send notificatioin on task created` })
    sendNotification?: boolean;

    @Field({ nullable:true, description: `To save task as template as well` })
    saveTaskAsTemplate?: string;

    @Field({ nullable:true, description: `BKPID attached with task` })
    BKPID?: string;

    @Field({ nullable:true, description: `PhaseID attached with task` })
    phaseID?: string;

    @Field({ nullable:true, description: `BKP Title attached with task` })
    BKPTitle?: string;

    @Field({ nullable:true, description: `Phase Name attached with task` })
    phaseName?: string;

    @Field(type => StatusEnum, { nullable:true, description: `Task status` })
    status?: StatusEnum;

    @Field({ nullable: true, description: ` Task ParentID`  })
    fileID?: string;

    @Field({ nullable: true, description: ` Project workType ID`  })
    projectWorktypeID?: string;

    @Field(type => ProjectWorkTypeEnum, { nullable: true, description: `Task status` })
    projectWorktype?: ProjectWorkTypeEnum;

    @Field({ nullable: true, description: ` Project workType Name`  })
    projectWorktypeName?: string;

    @Field({ nullable: true, description: ` Task ParentID`  })
    fileName?: string;

    @Field({ nullable: true, description: ` Task ParentID`  })
    taskTypeID?: string;

    @Field(type => TaskTypeEnum, { nullable:true, description: `Task status` })
    taskType?: TaskTypeEnum;

    @Field({ nullable: true, description: ` Task Type Name`  })
    taskTypeName?: string;
  
  
    @Field({ nullable: true, description: ` work Type ParentID`  })
    workTypeID?: string;
  
  
    @Field({ nullable: true, description: ` work Type Name `  })
    workTypeName?: string;

    @Field({ nullable:true, description: `Description of task` })
    description?: string;

}
