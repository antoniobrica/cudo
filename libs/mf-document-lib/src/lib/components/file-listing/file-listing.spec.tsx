import React from 'react';
import { render } from '@testing-library/react';

import FileListing from './file-listing';

describe('FileListing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileListing />);
    expect(baseElement).toBeTruthy();
  });
});
