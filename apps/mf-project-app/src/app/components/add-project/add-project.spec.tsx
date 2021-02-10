import React from 'react';
import { render } from '@testing-library/react';

import AddProject from './add-project';

describe('AddProject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddProject />);
    expect(baseElement).toBeTruthy();
  });
});
