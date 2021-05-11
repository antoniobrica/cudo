import { NotFoundException } from '@nestjs/common';

class ProtocolNotFoundException extends NotFoundException {
  constructor(protocolID: string) {
    super(`Protocol with id ${protocolID} not found`);
  }
}

export default ProtocolNotFoundException;