import React from 'react';
import { render } from '@testing-library/react';

import CompanyWorkType from './company-work-type';

describe('CompanyWorkType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompanyWorkType />);
    expect(baseElement).toBeTruthy();
  });
});
