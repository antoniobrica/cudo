import React from 'react';
import { render } from '@testing-library/react';

import Leftmenu from './leftmenu';

describe('Leftmenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Leftmenu />);
    expect(baseElement).toBeTruthy();
  });
});
