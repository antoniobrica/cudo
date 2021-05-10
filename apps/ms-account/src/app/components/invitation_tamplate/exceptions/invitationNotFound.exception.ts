import { NotFoundException } from '@nestjs/common';

class InvitationNotFoundException extends NotFoundException {
  constructor(invitationTemplateID: string) {
    super(`invitation with id ${invitationTemplateID} not found`);
  }
}

export default InvitationNotFoundException;