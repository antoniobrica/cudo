import React from 'react';
import { render } from '@testing-library/react';

import BkpHierarchyIndex from './bkp-hierarchy-index';

describe('BkpHierarchyIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BkpHierarchyIndex />);
    expect(baseElement).toBeTruthy();
  });
});
