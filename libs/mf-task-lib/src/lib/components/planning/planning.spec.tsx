import React from 'react';
import { render } from '@testing-library/react';

import Planning from './planning';

describe('Planning', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Planning />);
    expect(baseElement).toBeTruthy();
  });
});
