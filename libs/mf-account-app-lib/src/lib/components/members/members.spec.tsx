import React from 'react';
import { render } from '@testing-library/react';

import Members from './members';

describe('Members', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Members />);
    expect(baseElement).toBeTruthy();
  });
});
