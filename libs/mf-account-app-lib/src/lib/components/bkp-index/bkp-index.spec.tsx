import React from 'react';
import { render } from '@testing-library/react';

import BkpIndex from './bkp-index';

describe('BkpIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BkpIndex />);
    expect(baseElement).toBeTruthy();
  });
});
