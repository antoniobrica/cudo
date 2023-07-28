import React from 'react';
import { render } from '@testing-library/react';

import Admins from './admins';

describe('Admins', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Admins />);
    expect(baseElement).toBeTruthy();
  });
});
