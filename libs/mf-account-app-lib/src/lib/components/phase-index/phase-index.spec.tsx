import React from 'react';
import { render } from '@testing-library/react';

import PhaseIndex from './phase-index';

describe('PhaseIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhaseIndex />);
    expect(baseElement).toBeTruthy();
  });
});
