import React from 'react';
import { render } from '@testing-library/react';

import MfAccountAppLib from './mf-account-app-lib';

describe('MfAccountAppLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfAccountAppLib />);
    expect(baseElement).toBeTruthy();
  });
});
