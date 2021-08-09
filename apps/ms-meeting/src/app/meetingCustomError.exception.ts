import { HttpException } from '@nestjs/common';
import { MeetingCustomMessage } from './meetingCustomErrorMessage'

class MeetingCustomError extends HttpException {
    constructor(errorCode: string) {
        super(MeetingCustomMessage[errorCode].message, MeetingCustomMessage[errorCode].code);
    }
}

export default MeetingCustomError;