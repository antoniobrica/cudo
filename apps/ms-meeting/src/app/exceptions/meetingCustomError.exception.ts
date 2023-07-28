import { HttpException } from '@nestjs/common';
import { MeetingErrorData } from './meetingCustomErrorMessage';

class MeetingCustomError extends HttpException {
    constructor(errorCode: number) {
        const errorData = MeetingErrorData(errorCode)
        super(errorData.message, errorData.code);
    }
}

export default MeetingCustomError;