import React from 'react';
import { render } from '@testing-library/react';

import MfAccountAppMount from './mf-account-app-mount';

describe('MfAccountAppMount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfAccountAppMount />);
    expect(baseElement).toBeTruthy();
  });
});
