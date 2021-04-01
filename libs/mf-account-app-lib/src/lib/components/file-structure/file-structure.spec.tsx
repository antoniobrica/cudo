import React from 'react';
import { render } from '@testing-library/react';

import FileStructure from './file-structure';

describe('FileStructure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileStructure />);
    expect(baseElement).toBeTruthy();
  });
});
