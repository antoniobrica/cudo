import { NotFoundException } from '@nestjs/common';

class MeetingNotFoundException extends NotFoundException {
  constructor(meetingId: string) {
    super(`Meeting with id ${meetingId} not found`);
  }
}

export default MeetingNotFoundException;