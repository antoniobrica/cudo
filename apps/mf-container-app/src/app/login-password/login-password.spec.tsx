import React from 'react';
import { render } from '@testing-library/react';

import LoginPassword from './login-password';

describe('LoginPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginPassword />);
    expect(baseElement).toBeTruthy();
  });
});
