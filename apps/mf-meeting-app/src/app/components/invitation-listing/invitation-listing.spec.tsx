import { render } from '@testing-library/react';

import InvitationList from './invitation-listing';

describe('InvitationList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InvitationList />);
    expect(baseElement).toBeTruthy();
  });
});
