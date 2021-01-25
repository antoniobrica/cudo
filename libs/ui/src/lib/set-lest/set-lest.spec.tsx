import React from 'react';
import { render } from '@testing-library/react';

import SetLest from './set-lest';

describe('SetLest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SetLest />);
    expect(baseElement).toBeTruthy();
  });
});
