import { MeetingErrorTypeEnum } from "../enums/meeting-error-type.enum"

interface IMeetingErrorCode {
    message: string;
    code: number
}

export const MeetingErrorData = (errorCode: number): IMeetingErrorCode => {
    switch (errorCode) {
        case MeetingErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code: 409 }
        case MeetingErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Record not exist", code: 404 }
        case MeetingErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code: 400 }
        case MeetingErrorTypeEnum.NO_TITLE:
            return { message: "Can't pass empty Title", code: 400 }
        case MeetingErrorTypeEnum.NO_WORKTYPE:
            return { message: "Can't pass empty Worktype", code: 400 }
        case MeetingErrorTypeEnum.NO_PHASE:
            return { message: "Can't pass empty Phase", code: 400 }
        case MeetingErrorTypeEnum.NO_ASSIGNEE:
            return { message: "Can't pass empty Assignee", code: 400 }
        case MeetingErrorTypeEnum.NO_CATEGORY:
            return {message: "Can't pass empty Category", code: 400}
        case MeetingErrorTypeEnum.NO_MEMBERS:
            return { message: "Can't pass empty Members", code: 400 }
        case MeetingErrorTypeEnum.WRONG_TIME:
            return { message: "Can't pass smaller End time", code: 400 }
        case MeetingErrorTypeEnum.NO_DATE:
            return { message: "Can't pass empty Date", code: 400 }
        case MeetingErrorTypeEnum.NO_INVITATION:
            return { message: "Can't pass empty Invitation", code: 400 }
        case MeetingErrorTypeEnum.NO_PROTOCOL:
            return { message: "Can't pass empty Protocol", code: 400 }
        case MeetingErrorTypeEnum.NO_ADMIN:
            return { message: "Can't pass empty Admin", code: 400 }
        case MeetingErrorTypeEnum.NO_TIME:
            return { message: "Can't pass empty time", code: 400 }
        case MeetingErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: 404 }
        case MeetingErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code: 404 }
        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}