import { MeetingErrorTypeEnum } from "../enums/meeting-error-type.enum"

interface IMeetingErrorCode {
    message: string;
    code: number
}

const port = process.env.PORT || 3333

export const MeetingErrorData = (errorCode: number): IMeetingErrorCode => {
    switch (errorCode) {
        case MeetingErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code: +(port + "1") }
        case MeetingErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Record not exist", code: +(port + "2") }
        case MeetingErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code: +(port + "3") }
        case MeetingErrorTypeEnum.NO_TITLE:
            return { message: "Can't pass empty Title", code: +(port + "4") }
        case MeetingErrorTypeEnum.NO_WORKTYPE:
            return { message: "Can't pass empty Worktype", code: +(port + "5") }
        case MeetingErrorTypeEnum.NO_PHASE:
            return { message: "Can't pass empty Phase", code: +(port + "6") }
        case MeetingErrorTypeEnum.NO_ASSIGNEE:
            return { message: "Can't pass empty Assignee", code: +(port + "7") }
        case MeetingErrorTypeEnum.NO_CATEGORY:
            return {message: "Can't pass empty Category", code: +(port + "8")}
        case MeetingErrorTypeEnum.NO_MEMBERS:
            return { message: "Can't pass empty Members", code: +(port + "9") }
        case MeetingErrorTypeEnum.WRONG_TIME:
            return { message: "Can't pass smaller End time", code: +(port + "10") }
        case MeetingErrorTypeEnum.NO_DATE:
            return { message: "Can't pass empty Date", code: +(port + "11") }
        case MeetingErrorTypeEnum.NO_INVITATION:
            return { message: "Can't pass empty Invitation", code: +(port + "12") }
        case MeetingErrorTypeEnum.NO_PROTOCOL:
            return { message: "Can't pass empty Protocol", code: +(port + "31") }
        case MeetingErrorTypeEnum.NO_ADMIN:
            return { message: "Can't pass empty Admin", code: +(port + "14") }
        case MeetingErrorTypeEnum.NO_TIME:
            return { message: "Can't pass empty time", code: +(port + "15") }
        case MeetingErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: +(port + "16") }
        case MeetingErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code: +(port + "17") }
        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}