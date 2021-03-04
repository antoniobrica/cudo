import React from 'react';
import { render } from '@testing-library/react';

import FollowersIndex from './followers-index';

describe('FollowersIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FollowersIndex />);
    expect(baseElement).toBeTruthy();
  });
});
