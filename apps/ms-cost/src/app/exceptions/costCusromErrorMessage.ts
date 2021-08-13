import { CostErrorTypeEnum } from "../enums/cost-error-type.enum"

interface ICostErrorCode {
    message: string;
    code: number
}

export const CostErrorData = (errorCode: number): ICostErrorCode => {
    switch (errorCode) {
        case CostErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code: 2001 }

        case CostErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Record not exist", code: 2002 }

        case CostErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code: 2003 }
        case CostErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: 2004 }
        case CostErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code: 2005 }
        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}