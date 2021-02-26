import React from 'react';
import { render } from '@testing-library/react';

import ProjectMenu from './project-menu';

describe('ProjectMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectMenu />);
    expect(baseElement).toBeTruthy();
  });
});
