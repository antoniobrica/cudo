import { MeetingErrorTypeEnum } from "../enums/meeting-error-type.enum"

interface IMeetingErrorCode {
    message: string;
    code: number
}

const port = process.env.PORT || 3333

export const MeetingErrorData = (errorCode: number): IMeetingErrorCode => {
    switch (errorCode) {
        case MeetingErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code :4001 }
        case MeetingErrorTypeEnum.RECORD_NOT_EXIST:
            return { message: "Record not exist", code :4002 }
        case MeetingErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code :4003 }
        case MeetingErrorTypeEnum.NO_TITLE:
            return { message: "Can't pass empty Title", code :4004 }
        case MeetingErrorTypeEnum.NO_WORKTYPE:
            return { message: "Can't pass empty Worktype", code :4005 }
        case MeetingErrorTypeEnum.NO_PHASE:
            return { message: "Can't pass empty Phase", code :4006 }
        case MeetingErrorTypeEnum.NO_ASSIGNEE:
            return { message: "Can't pass empty Assignee", code :4007 }
        case MeetingErrorTypeEnum.NO_CATEGORY:
            return {message: "Can't pass empty Category", code :4008 }
        case MeetingErrorTypeEnum.NO_MEMBERS:
            return { message: "Can't pass empty Members", code :4009 }
        case MeetingErrorTypeEnum.WRONG_TIME:
            return { message: "Can't pass smaller End time", code :4010 }
        case MeetingErrorTypeEnum.NO_DATE:
            return { message: "Can't pass empty Date", code :4011 }
        case MeetingErrorTypeEnum.NO_INVITATION:
            return { message: "Can't pass empty Invitation", code :4012 }
        case MeetingErrorTypeEnum.NO_PROTOCOL:
            return { message: "Can't pass empty Protocol", code :4013 }
        case MeetingErrorTypeEnum.NO_ADMIN:
            return { message: "Can't pass empty Admin", code :4014 }
        case MeetingErrorTypeEnum.NO_TIME:
            return { message: "Can't pass empty time", code :4015 }
        case MeetingErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code :4016 }
        case MeetingErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code :4017 }
        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}