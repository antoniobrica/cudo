import React from 'react';
import { render } from '@testing-library/react';

import UserProfileEdit from './user-profile-edit';

describe('UserProfileEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProfileEdit />);
    expect(baseElement).toBeTruthy();
  });
});
