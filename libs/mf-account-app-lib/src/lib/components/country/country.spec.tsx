import React from 'react';
import { render } from '@testing-library/react';

import Country from './country';

describe('Country', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Country />);
    expect(baseElement).toBeTruthy();
  });
});
