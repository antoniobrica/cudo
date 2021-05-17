import React from 'react';
import { render } from '@testing-library/react';

import Followers from './followers';

describe('Followers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Followers />);
    expect(baseElement).toBeTruthy();
  });
});
