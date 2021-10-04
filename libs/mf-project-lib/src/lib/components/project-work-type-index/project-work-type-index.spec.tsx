import React from 'react';
import { render } from '@testing-library/react';

import ProjectWorkTypeIndex from './project-work-type-index';

describe('ProjectWorkTypeIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectWorkTypeIndex />);
    expect(baseElement).toBeTruthy();
  });
});
