import React from 'react';
import { render } from '@testing-library/react';

import FileDetails from './file-details';

describe('FileDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileDetails />);
    expect(baseElement).toBeTruthy();
  });
});
