import React from 'react';
import { render } from '@testing-library/react';

import LoginSelect from './login-select';

describe('LoginSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginSelect />);
    expect(baseElement).toBeTruthy();
  });
});
