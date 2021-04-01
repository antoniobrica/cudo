import React from 'react';
import { render } from '@testing-library/react';

import FileType from './file-type';

describe('FileType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileType />);
    expect(baseElement).toBeTruthy();
  });
});
