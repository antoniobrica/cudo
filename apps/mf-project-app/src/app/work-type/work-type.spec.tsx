import React from 'react';
import { render } from '@testing-library/react';

import WorkType from './work-type';

describe('WorkType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkType />);
    expect(baseElement).toBeTruthy();
  });
});
