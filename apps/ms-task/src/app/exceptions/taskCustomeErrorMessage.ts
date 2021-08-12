import { TaskErrorTypeEnum } from "../enums/task-error-type.enum"

interface ITaskErrorCode {
    message: string;
    code: number
}

export const TaskErrorData = (errorCode: number): ITaskErrorCode => {
    switch (errorCode) {
        case TaskErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code: 7001 }

        case TaskErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Record not exist", code: 7002 }

        case TaskErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code: 7003 }

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
        case TaskErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: 7010 }
        case TaskErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code: 7011 }
        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}