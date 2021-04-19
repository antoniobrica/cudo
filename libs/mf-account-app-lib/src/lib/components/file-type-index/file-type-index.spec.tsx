import React from 'react';
import { render } from '@testing-library/react';

import FileTypeIndex from './file-type-index';

describe('FileTypeIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileTypeIndex />);
    expect(baseElement).toBeTruthy();
  });
});
