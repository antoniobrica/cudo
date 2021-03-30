import React from 'react';
import { render } from '@testing-library/react';

import AddFile from './add-file';

describe('AddFile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddFile />);
    expect(baseElement).toBeTruthy();
  });
});
