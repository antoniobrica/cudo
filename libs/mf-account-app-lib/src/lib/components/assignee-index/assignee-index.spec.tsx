import React from 'react';
import { render } from '@testing-library/react';

import AssigneeIndex from './assignee-index';

describe('AssigneeIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AssigneeIndex />);
    expect(baseElement).toBeTruthy();
  });
});
