import React from 'react';
import { render } from '@testing-library/react';

import AdminsIndex from './admins-index';

describe('AdminsIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsIndex />);
    expect(baseElement).toBeTruthy();
  });
});
