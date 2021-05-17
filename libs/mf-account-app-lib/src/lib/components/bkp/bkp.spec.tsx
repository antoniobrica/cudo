import React from 'react';
import { render } from '@testing-library/react';

import Bkp from './bkp';

describe('Bkp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bkp />);
    expect(baseElement).toBeTruthy();
  });
});
