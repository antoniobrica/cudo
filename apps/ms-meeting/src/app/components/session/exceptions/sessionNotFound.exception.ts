import { NotFoundException } from '@nestjs/common';

class SessionNotFoundException extends NotFoundException {
  constructor(sessionID: string) {
    super(`Session with id ${sessionID} not found`);
  }
}

export default SessionNotFoundException;