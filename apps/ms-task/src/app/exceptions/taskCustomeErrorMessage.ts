import { TaskErrorTypeEnum } from "../enums/task-error-type.enum"

interface ITaskErrorCode {
    message: string;
    code: number
}

const port = process.env.PORT || 3333;

export const TaskErrorData = (errorCode: number): ITaskErrorCode => {
    switch (errorCode) {
        case TaskErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code: +(port + "1") }

        case TaskErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Record not exist", code: +(port + "2") }

        case TaskErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code: +(port + "3") }

        case TaskErrorTypeEnum.NO_TITLE:
            return { message: "Can't pass empty Title", code: +(port + "4") }

        case TaskErrorTypeEnum.NO_WORKTYPE:
            return { message: "Can't pass empty Worktype", code: +(port + "5") }

        case TaskErrorTypeEnum.NO_PHASE:
            return { message: "Can't pass empty Phase", code: +(port + "6") }

        case TaskErrorTypeEnum.NO_ASSIGNEE:
            return { message: "Can't pass empty Assignee", code: +(port + "7") }

        case TaskErrorTypeEnum.WRONG_DATE:
            return { message: "Can't pass smaller End Date", code: +(port + "8") }
        case TaskErrorTypeEnum.NO_DATE:
            return { message: "Can't pass empty Date", code: +(port + "9") }
        case TaskErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: +(port + "10") }
        case TaskErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code: +(port + "11") }
        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}