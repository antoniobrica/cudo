import { TaskErrorTypeEnum } from "../enums/task-error-type.enum"

interface ITaskErrorCode {
    message: string;
    code: number
}

export const TaskErrorData = (errorCode: number): ITaskErrorCode => {
    switch (errorCode) {
        case TaskErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Task already exists", code: 7001 }

        case TaskErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Task not exist", code: 7002 }

        case TaskErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Task not_added", code: 7003 }

        case TaskErrorTypeEnum.NO_TITLE:
            return { message: "Can't pass empty Title", code: 7004 }

        case TaskErrorTypeEnum.NO_WORKTYPE:
            return { message: "Can't pass empty Worktype", code: 7005 }

        case TaskErrorTypeEnum.NO_PHASE:
            return { message: "Can't pass empty Phase", code: 7006 }

        case TaskErrorTypeEnum.NO_ASSIGNEE:
            return { message: "Can't pass empty Assignee", code: 7007 }

        case TaskErrorTypeEnum.WRONG_DATE:
            return { message: "Can't pass smaller End Date", code: 7008 }

        case TaskErrorTypeEnum.NO_DATE:
            return { message: "Can't pass empty Date", code: 7009 }

        case TaskErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code: 7010 }

        case TaskErrorTypeEnum.SUBTASK_NOT_EXITST:
            return { message: "Subtask does not exists", code: 7011 }

        case TaskErrorTypeEnum.NO_SUBTASK_TITLE:
            return { message: "Can't pass empty subtask title", code: 7012 }

        case TaskErrorTypeEnum.NO_DUE_DATE:
            return { message: "Can't pass empty due date", code: 7013 }

        case TaskErrorTypeEnum.NO_PLANNING_WORKTYPE:
            return { message: "Can't pass empty planning worktype", code: 7014 }

        case TaskErrorTypeEnum.NO_PLANNING_TITLE:
            return { message: "Can't pass empty planning title", code: 7015 }

        case TaskErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: 7016 }

        case TaskErrorTypeEnum.PLANNING_NOT_EXITST:
            return { message: "Planning not found", code: 7017 }

        case TaskErrorTypeEnum.TASK_NOT_FOUND:
            return { message: "Task not found", code: 7018 }

        case TaskErrorTypeEnum.COMMENT_NOT_FOUND:
            return { message: "Comment not found", code: 7019 }

        case TaskErrorTypeEnum.COMMENT_NOT_ADDED:
            return { message: "Comment not added", code: 7020 }

        case TaskErrorTypeEnum.COMMENT_ID_NOT_PROVIDE:
            return { message: "Comment id not provided", code: 7021 }

        case TaskErrorTypeEnum.COMMENT_NOT_UPDATED:
            return { message: "Comment not updated", code: 7022 }

        case TaskErrorTypeEnum.COMMENT_NOT_DELETED:
            return { message: "Comment not deleted", code: 7023 }

        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}