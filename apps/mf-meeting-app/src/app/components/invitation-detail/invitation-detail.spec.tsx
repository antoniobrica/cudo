import { render } from '@testing-library/react';

import InvitationDetail from './invitation-detail';

describe('InvitationDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InvitationDetail />);
    expect(baseElement).toBeTruthy();
  });
});
