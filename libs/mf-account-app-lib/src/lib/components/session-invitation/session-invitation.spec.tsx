import { render } from '@testing-library/react';

import SessionInvitation from './session-invitation';

describe('SessionInvitation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionInvitation />);
    expect(baseElement).toBeTruthy();
  });
});
