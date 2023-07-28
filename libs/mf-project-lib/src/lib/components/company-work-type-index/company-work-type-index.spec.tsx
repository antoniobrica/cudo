import React from 'react';
import { render } from '@testing-library/react';

import CompanyWorkTypeIndex from './company-work-type-index';

describe('CompanyWorkTypeIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompanyWorkTypeIndex />);
    expect(baseElement).toBeTruthy();
  });
});
