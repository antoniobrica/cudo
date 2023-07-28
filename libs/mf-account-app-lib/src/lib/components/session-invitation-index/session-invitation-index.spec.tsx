import { render } from '@testing-library/react';

import SessionInvitationIndex from './session-invitation-index';

describe('SessionInvitationIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionInvitationIndex />);
    expect(baseElement).toBeTruthy();
  });
});
