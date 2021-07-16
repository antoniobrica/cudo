import React from 'react';
import { render } from '@testing-library/react';

import MembersIndex from './members-index';

describe('MembersIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MembersIndex />);
    expect(baseElement).toBeTruthy();
  });
});
