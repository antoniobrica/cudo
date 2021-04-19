import React from 'react';
import { render } from '@testing-library/react';

import FileStructureIndex from './file-structure-index';

describe('FileStructureIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileStructureIndex />);
    expect(baseElement).toBeTruthy();
  });
});
