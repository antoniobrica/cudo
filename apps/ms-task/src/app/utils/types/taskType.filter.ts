import { Field, InputType } from "@nestjs/graphql";
import { TaskTypeEnum } from "../../enums/taskType.enum";


@InputType()
class taskTypeFilterParam {

    @Field({ nullable: true, description: `  file ID`  })
    fileID?: string;

    @Field({ nullable: true, description: ` Task ParentID`  })
    taskTypeID?: string;

    // @Field({ nullable: true, description: ` Task ParentID`  })
    // taskTypeParentID?: string;

    // @Field({ nullable: true, description: ` Task ChileID`  })
    // taskTypeChildID?: string;
    
    @Field(type => TaskTypeEnum, { description: ` Task Status` })
    taskType?: TaskTypeEnum;
}

export default taskTypeFilterParam;