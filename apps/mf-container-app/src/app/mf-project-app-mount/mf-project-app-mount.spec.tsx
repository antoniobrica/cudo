import React from 'react';
import { render } from '@testing-library/react';

import MfProjectAppMount from './mf-project-app-mount';

describe('MfProjectAppMount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfProjectAppMount />);
    expect(baseElement).toBeTruthy();
  });
});
