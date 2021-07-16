import { render } from '@testing-library/react';

import InvitationAdd from './invitation-add';

describe('InvitationAdd', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InvitationAdd />);
    expect(baseElement).toBeTruthy();
  });
});
