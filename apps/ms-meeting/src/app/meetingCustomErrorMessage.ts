interface IMeetingErrorCode {
  message: string;
  code: number
}

export const MeetingCustomMessage: { [errorCode: string]: IMeetingErrorCode } = {
  "record_already_exist": { message: "Record already exists", code: 1234 },
  "record_not_exist": { message: "Record not exist", code: 1235 },
  "record_not_added": { message: "Record not_added", code: 1236 },
  "internal_server_error": { message: "An internal server error occurred", code: 1237 }
}

