import { render } from '@testing-library/react';

import InvitationDelete from './invitation-delete';

describe('InvitationDelete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InvitationDelete />);
    expect(baseElement).toBeTruthy();
  });
});
