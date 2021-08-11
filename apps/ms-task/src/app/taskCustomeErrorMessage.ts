import { TaskErrorTypeEnum } from "./enums/task-error-type.enum"

interface IMeetingErrorCode {
    message: string;
    code: number
}

export const TaskErrorData = (errorCode: number): IMeetingErrorCode => {
    switch (errorCode) {
        case TaskErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code: 409 }
            
        case TaskErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Record not exist", code: 404 }

        case TaskErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code: 400 }
        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}