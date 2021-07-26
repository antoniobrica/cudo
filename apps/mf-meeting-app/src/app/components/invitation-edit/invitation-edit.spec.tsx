import { render } from '@testing-library/react';

import InvitationEdit from './invitation-edit';

describe('InvitationEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InvitationEdit />);
    expect(baseElement).toBeTruthy();
  });
});
