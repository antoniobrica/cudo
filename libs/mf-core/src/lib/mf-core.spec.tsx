import React from 'react';
import { render } from '@testing-library/react';

import MfCore from './mf-core';

describe('MfCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfCore />);
    expect(baseElement).toBeTruthy();
  });
});
