import React from 'react';
import { render } from '@testing-library/react';

import Phase from './phase';

describe('Phase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Phase />);
    expect(baseElement).toBeTruthy();
  });
});
