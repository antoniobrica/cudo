import React from 'react';
import { render } from '@testing-library/react';

import UserRegistration from './user-registration';

describe('UserRegistration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserRegistration />);
    expect(baseElement).toBeTruthy();
  });
});
