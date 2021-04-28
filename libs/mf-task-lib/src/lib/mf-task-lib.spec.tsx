import React from 'react';
import { render } from '@testing-library/react';

import MfTaskLib from './mf-task-lib';

describe('MfTaskLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfTaskLib />);
    expect(baseElement).toBeTruthy();
  });
});
